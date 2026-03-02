# Firebase Firestore Database Architecture
*Targeting: VetNary System (Banking-Style Setup)*

## 1. Core Principles
- **NoSQL Flattening:** Data will be heavily denormalized to avoid complex joins. Read speeds are prioritized.
- **Role Isolation:** Vets can ONLY read their specific `branch_id`. Minor Admins can read anonymized data. Main Admins can read everything but cannot alter financial hashes.
- **Account Numbers:** Instead of using Firebase `uids` directly in the UI, all customers get a display-friendly `account_number` (e.g., `VN-8429`).

---

## 2. Collections & Documents

### `users` (Collection)
Stores both Customers and Staff (Vets, Admins).
```json
// Document ID: {firebase_uid}
{
  "account_number": "VN-8429", // Auto-generated 4-digit code
  "full_name": "Kasun Perera",
  "email": "kasun@example.com",
  "phone_number": "+94771234567",
  "role": "customer", // customer | vet | minor_admin | main_admin
  "branch_id": null, // If role = 'vet', this maps to their clinic
  "created_at": "2026-10-24T10:00:00Z"
}
```

### `pets` (Collection)
Stored at the top level (not a subcollection) so any Vet can search for a Pet across the Sri Lanka network if the user gave them the Account Number.
```json
// Document ID: {auto_id}
{
  "owner_uid": "{firebase_uid}",
  "owner_account_number": "VN-8429",
  "name": "Rocky",
  "species": "Dog",
  "breed": "German Shepherd",
  "dob": "2020-05-12"
}
```

### `clinics` (Collection)
The independent branches (Vets).
```json
// Document ID: {branch_id}
{
  "name": "River Edge Vet",
  "address": "123 Colombo Rd",
  "contact": "0112345678",
  "primary_vet_uid": "{firebase_uid}",
  "discount_tier": "Gold", 
  "monthly_volume": 142,
  
  // SECURE FINANCIALS (Hashed for Minor Admins)
  "daily_revenue": 42500, // Visible to Vet & Main Admin
  "hashed_target": "8a4f9b2c...", // Cryptographic hash for UI display
}
```

### `appointments` (Collection)
Tracks queueing and medical history.
```json
// Document ID: {auto_id}
{
  "branch_id": "{branch_id}",
  "pet_id": "{pet_auto_id}",
  "owner_account_number": "VN-8429",
  "date": "2026-10-25T14:30:00Z",
  "status": "pending", // pending | confirmed | completed | missed
  "reason": "Vaccination Booster",
  "notes": "..."
}
```

### `support_tickets` (Collection)
The Contact Center Queue for Minor Admins.
```json
// Document ID: {auto_id}
{
  "ticket_id": "TK-402",
  "owner_account_number": "VN-8429",
  "issue": "Discrepancy in vaccine bill",
  "priority": "High",
  "target_branch_id": "{branch_id}", // If 'null', Minor Admins handle it. If set, routes to Vet.
  "status": "New" // New | Working | Routed | Resolved
}
```

### `staging_commits` (Collection)
The Git-Style Authorization Queue.
```json
// Document ID: {auto_id}
{
  "commit_msg": "Update CL-01 Platform Discount Tier to 20%",
  "proposed_by_uid": "{minor_admin_uid}",
  "target_clinic_id": "{branch_id}",
  "proposed_change": { "discount_tier": "Platinum" },
  "status": "Pending", // Pending | Approved | Rejected | Deployed
  "approved_by_uid": null,
  "execute_at": "2026-10-24T12:00:00Z" // Exact 12:00 PM timestamp
}
```

---

## 3. Firebase Security Rules (`firestore.rules`)
*This file will be deployed to Firebase to strictly enforce access at the database level.*

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // CUSTOMER: Can only read/write their own data & pets
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /pets/{petId} {
        // Can read if owner. Vets can read if they have an active appt.
      allow read: if request.auth != null; 
      allow write: if request.auth != null && request.auth.uid == resource.data.owner_uid;
    }

    // VET BRANCH: Can only read/write their specific branch data & appts
    match /clinics/{branchId} {
      // Vets can read their own clinic. Minor admins can read public data only.
      allow read: if request.auth != null; 
      allow write: if request.auth.token.role == 'main_admin';
    }
    match /appointments/{apptId} {
      allow read, write: if request.auth.token.role == 'vet' && resource.data.branch_id == request.auth.token.branch_id;
    }

    // MAIN ADMIN: God mode
    match /{document=**} {
      allow read, write: if request.auth.token.role == 'main_admin';
    }
    
  }
}
```
