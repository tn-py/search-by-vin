
# Search by VIN

Search by VIN is a React-based web application that allows users to retrieve vehicle information by entering a Vehicle Identification Number (VIN). This project uses the NHTSA (National Highway Traffic Safety Administration) API to decode VIN numbers and display relevant vehicle details.


## Features
- User authentication with Supabase
- VIN search functionality
- Real-time feedback using toast notifications
- Responsive design using shadcn/ui components

## Technologies Used
- Next.js 14
- React
- TypeScript
- Supabase for authentication
- shadcn/ui for UI components
- Axios for API requests

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn
- Git

## Installation
1. Clone the repository:
git clone https://github.com/yourusername/search-by-vin.git
cd search-by-vin
2. Install dependencies:
npm install
or
yarn install
3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Supabase credentials:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
4. Install shadcn/ui components:

## Usage

1. Start the development server:
npm run dev
or
yarn dev
2. Open your browser and navigate to `http://localhost:3000`

3. Sign in or create an account to access the VIN search feature

4. Enter a 17-character VIN in the search box and click "Search"

5. View the retrieved vehicle information

## Project Structure

- `app/`: Contains the Next.js application pages
- `protected/`: Houses the protected route for authenticated users
 - `page.tsx`: Main component with VIN search functionality
- `components/`: Reusable React components
- `utils/`: Utility functions, including Supabase client setup

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- NHTSA for providing the VIN decoding API
- shadcn/ui for the beautiful and accessible UI components
- Supabase for the authentication system

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
