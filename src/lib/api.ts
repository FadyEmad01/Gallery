import { getToken } from './getToken';

// Define the environment variable type, in case it's not set
const API_KEY: string = process.env.NEXT_PUBLIC_API_KEY || "";

// Define types for the login and register request payloads
interface LoginData {
  email: string;
  password: string;
}
interface registerData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

// Define a generic type for the response, assuming the API response will return a JSON object
interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}
// api post interface
interface Author {
  user_id: string;
  email: string;
  name: string;
  profile_picture: string | null;
}
interface Post {
  Board_id: string;
  image_url: string;
  description: string;
  price: string;
  author: Author;
}
interface ApiPostResponse {
  count: number;
  boards: Post[];
  message?: string;
}
// end api post interface

// api postBoard

// interface PostBoardData {
//   image: File, description: string, price: string, name: string
// }
// end api postBoard

// Define an interface for Board
interface Board {
  Board_id: string;
  name: string;
  image_url: string;
  description: string;
  price: string;
  created_at: string;
}

// Define an interface for User
interface User {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  boards: Board[]; // Array of Board
}

// Define an interface for the API response
interface UserResponse {
  message: string;
  user: User | null; //; // Specify that user can be either User or null
  success: boolean;
}

export async function fetchProfile(): Promise<UserResponse> {
  const token = getToken(); // Retrieve the token from cookies
  const response = await fetch("https://gallerista-app.vercel.app/api/V0/user/profile", {
    method: 'GET', // Use 'GET' for fetching profile data or 'POST', 'PUT' for updates
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'x-api-key': API_KEY, // Include the API key
    },
    cache: 'no-cache'
  });

  if (!response.ok) {
    const errorData = await response.json();
    return {
      success: false,
      user: null, // Set user to null in case of error
      message: errorData.message || 'Failed to fetch profile', // Fallback message
    };
  }

  const responseData = await response.json();

  return {
    success: true,
    user: responseData.user, // Ensure you map this correctly according to your API response
    message: 'User retrieved successfully', // Set a default success message
  };
}


export async function login(data: LoginData): Promise<ApiResponse> {
  const response = await fetch("https://gallerista-app.vercel.app/api/V0/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    // Handle HTTP errors
    const errorData = await response.json();
    return { success: false, data: null, message: errorData.message }; // Ensure data is null
  }

  const responseData = await response.json();


  // Assuming your responseData includes the token
  const token = responseData.token; // Adjust this according to your API response structure
  if (token) {
    // Set the token in a cookie
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60}; secure; SameSite=Strict`;
  }


  return { success: true, data: responseData, message: responseData.message }; // Return the actual data on success

  // Return the parsed response as ApiResponse
  // return await response.json();
}

export async function register(data: registerData): Promise<ApiResponse> {
  const response = await fetch("https://gallerista-app.vercel.app/api/V0/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY
    },
    body: JSON.stringify(data)
  });


  if (!response.ok) {
    // Handle HTTP errors
    const errorData = await response.json();
    return { success: false, data: null, message: errorData.message }; // Ensure data is null
  }

  const responseData = await response.json();


  // Assuming your responseData includes the token
  const token = responseData.token; // Adjust this according to your API response structure
  if (token) {
    // Set the token in a cookie
    console.log("token done")
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60}; secure; SameSite=Strict`;
  }


  return { success: true, data: responseData, message: responseData.message }; // Return the actual data on success


}


export async function getAllPosts(): Promise<{ success: boolean; data: ApiPostResponse | null; message: string }> {
  try {
    const response = await fetch("https://gallerista-app.vercel.app/api/V0/boards", {
      next: { revalidate: 0 },
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY // replace API_KEY with your actual API key
      },
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json() as { message: string };
      return { success: false, data: null, message: errorData.message }; // Ensure data is null
    }

    const responseData = await response.json() as ApiPostResponse;
    return { success: true, data: responseData, message: "Posts fetched successfully" }; // Return the actual data on success

  } catch (error) {
    console.error("Error fetching posts:", error);
    return { success: false, data: null, message: "Failed to fetch posts" };
  }
}


export async function postBoard(data: FormData): Promise<ApiResponse> {
  const token = getToken(); // Retrieve the token from cookies
  const response = await fetch("https://gallerista-app.vercel.app/api/V0/board", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      'Authorization': `${token}`,
    },
    body: data 
  });

  if (!response.ok) {
    // Handle HTTP errors
    const errorData = await response.json();
    return { success: false, data: null, message: errorData.message }; // Ensure data is null
  }

  const responseData = await response.json();


  return { success: true, data: responseData, message: responseData.message }; // Return the actual data on success

  // Return the parsed response as ApiResponse
  // return await response.json();
}