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



// get board by id api interface 
interface Board_GetBoardById {
  Board_id: string;
  name: string;
  author_id: string;
  image_url: string;
  description: string;
  price: string;
  created_at: string;
  updated_at: string;
  author: Author_GetBoardById; // Including author details in the board
}

interface Author_GetBoardById {
  name: string;
  email: string;
  profile_picture: string | null;
  boards: Board_GetBoardById[]; // Author has an array of boards
}

interface BoardResponse_GetBoardById {
  message: string;
  board: Board_GetBoardById | null; // Single board or null
  success: boolean;
}
// end get board by id api interface

// save api 
interface SaveBoardResponse {
  message: string;
  save: {
    user_id: string;
    board_id: string;
  };
  success?: boolean;
}
// end save api 

interface SavedBoard {
  Board_id: string;
  name: string;
  author_id: string;
  image_url: string;
  description: string;
  price: string;
  created_at: string;
  updated_at: string;
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
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24}; secure; SameSite=Strict`;
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
    return { success: false, data: null, message: errorData.error }; // Ensure data is null
  }

  const responseData = await response.json();


  return { success: true, data: responseData, message: responseData.message }; // Return the actual data on success

  // Return the parsed response as ApiResponse
  // return await response.json();
}


export async function fetchUserById(id: string): Promise<UserResponse> {
  const token = getToken();
  const response = await fetch(`https://gallerista-app.vercel.app/api/V0/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'x-api-key': API_KEY,
    },
    cache: 'no-cache'
  });

  if (!response.ok) {
    const errorData = await response.json();
    return {
      success: false,
      user: null,
      message: errorData.message || 'Failed to fetch user data',
    };
  }

  const responseData = await response.json();
  return {
    success: true,
    user: responseData.user,
    message: 'User retrieved successfully',
  };
}

export async function fetchBoardById(id: string): Promise<BoardResponse_GetBoardById> {
  const token = getToken();
  const response = await fetch(`https://gallerista-app.vercel.app/api/V0/board/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'x-api-key': API_KEY,
    },
    cache: 'no-cache'
  });

  if (!response.ok) {
    const errorData = await response.json();
    return {
      success: false,
      board: null,
      message: errorData.message || 'Failed to fetch board data',
    };
  }

  const responseData = await response.json();
  return {
    success: true,
    board: responseData.board,
    message: 'Board retrieved successfully',
  };
}

export function logout() {
  document.cookie = `auth_token=; path=/; max-age=0; secure; SameSite=Strict`;
}

export async function saveBoardById(id: string): Promise<SaveBoardResponse> {
  const token = getToken();

  // if (!token) {
  //   return {
  //     message: 'Authorization token is missing',
  //     save: { user_id: '', board_id: '' },
  //     success: false,
  //   };
  // }

  const response = await fetch(`https://gallerista-app.vercel.app/api/V0/saveBoard/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'x-api-key': API_KEY,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    return {
      message: errorData.message || 'Failed to save board',
      save: { user_id: '', board_id: '' },
      success: false,
    };
  }

  const responseData = await response.json();
  return {
    message: responseData.message,
    save: responseData.save,
    success: true,
  };
}


// Function to get all saved boards for the authenticated user
export async function getSavedBoards(): Promise<SavedBoard[]> {
  const token = getToken(); // Ensure you get the user's token here.

  try {
    const response = await fetch('https://gallerista-app.vercel.app/api/V0/saveBoard', {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching saved boards:", errorData);
      return []; // Return an empty array if there's an error
    }

    const data = await response.json();

    // Return savedBoards from the response
    return data.saved_Boards; // Assuming the API response has 'saved_Boards'
  } catch (error) {
    console.error("Error during fetch:", error);
    return []; // Return an empty array in case of a network error
  }
}


export async function unsaveBoardById(boardId: string): Promise<SaveBoardResponse> {
  const token = getToken(); // Ensure you get the user's token here.

  const response = await fetch(`https://gallerista-app.vercel.app/api/V0/unSaveBoard/${boardId}`, {
    method: 'DELETE', // HTTP method should be DELETE for unsaving/removing
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'x-api-key': API_KEY,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error unsaving board:", errorData);
    return {
      message: errorData.message || 'Failed to unsave board',
      save: { user_id: '', board_id: '' },
      success: false,
    };
  }

  const responseData = await response.json();
  return {
    message: responseData.message,
    save: responseData.save,
    success: true,
  };
}