# PR Management System

This is a comprehensive PR Management System built with Next.js, Tailwind CSS, Zustand, and Shadcn. It features a robust authentication system using firebase Auth, account creation, PR management, reservation editing, and a fully functional settings page. For a Database it uses Firebase Firestore.

Demo: [Here](https://reservation-management.vercel.app/signin)



## Features

- **User Authentication and Account Creation**: Securely sign up new users and authenticate existing ones(either with email and password or Google Sign in). Uses Firebase Auth
- **PR Management**: Add and manage PRs with ease. (State management and adding/removing/editing/retreiving items in the database)
- **Dashboard**: View total reservations, money owed, and total people at a glance. (Mostly state management and fetching from Database)
- **Settings Page**: Manage your username, email, password, and profile photo.



## Key Files

- `app/prmanagement/page.js`: Contains the logic for PR management.
- `components/Pr.js`: Defines the PR component.
- `components/sortReservations.js`: Contains the logic for sorting reservations.

## Installation

1. Clone the repository.
2. Run `npm install` to install the dependencies.

add your own env file 

## Running the Project

To run the project, use the command `npm run dev`.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
