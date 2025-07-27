const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api"

interface UserResponse {
  _id: string
  username: string
  email: string
  role: string
  token: string
}

interface Tender {
  _id: string
  title: string
  description: string
  organization: string
  budget: number
  deadline: string
  category: string
  location: string
  status: "open" | "closed" | "awarded"
  createdAt: string
}

interface Application {
  _id: string
  tender: {
    _id: string
    title: string
    organization: string
    budget: number
    deadline: string
  }
  applicant: {
    _id: string
    username: string
    email: string
  }
  proposal: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

// Helper to handle API responses
async function handleResponse(response: Response) {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong")
  }
  return data
}

// Auth API Calls
export const registerUser = async (
  username: string,
  email: string,
  password: string,
  role: string,
): Promise<UserResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password, role }),
  })
  return handleResponse(response)
}

export const loginUser = async (email: string, password: string): Promise<UserResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  return handleResponse(response)
}

// Tender API Calls
export const getAllTenders = async (): Promise<Tender[]> => {
  const response = await fetch(`${API_BASE_URL}/tenders`)
  return handleResponse(response)
}

export const getTenderById = async (id: string): Promise<Tender> => {
  const response = await fetch(`${API_BASE_URL}/tenders/${id}`)
  return handleResponse(response)
}

export const createTender = async (
  tenderData: Omit<Tender, "_id" | "status" | "createdAt" | "updatedAt">,
  token: string,
): Promise<Tender> => {
  const response = await fetch(`${API_BASE_URL}/tenders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tenderData),
  })
  return handleResponse(response)
}

export const updateTender = async (id: string, tenderData: Partial<Tender>, token: string): Promise<Tender> => {
  const response = await fetch(`${API_BASE_URL}/tenders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tenderData),
  })
  return handleResponse(response)
}

export const deleteTender = async (id: string, token: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/tenders/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return handleResponse(response)
}

// Application API Calls
export const applyForTender = async (tenderId: string, proposal: string, token: string): Promise<Application> => {
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tenderId, proposal }),
  })
  return handleResponse(response)
}

export const getMyApplications = async (token: string): Promise<Application[]> => {
  const response = await fetch(`${API_BASE_URL}/applications/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return handleResponse(response)
}

export const getApplicationById = async (id: string, token: string): Promise<Application> => {
  const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return handleResponse(response)
}

export const updateApplicationStatus = async (
  id: string,
  status: "approved" | "rejected",
  token: string,
): Promise<Application> => {
  const response = await fetch(`${API_BASE_URL}/admin/applications/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  })
  return handleResponse(response)
}

// Admin API Calls
export const getAllUsers = async (token: string): Promise<UserResponse[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return handleResponse(response)
}

export const getAllApplications = async (token: string): Promise<Application[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return handleResponse(response)
}

// Utility to get user info from localStorage
export const getUserInfo = (): UserResponse | null => {
  if (typeof window === "undefined") return null // Ensure this runs only on client-side
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}
