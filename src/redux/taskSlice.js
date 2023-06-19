import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getToken from "../helpers/token";

// const ApiUrl = import.meta.env.VITE_API_URL;

const initalState = {
  data: [],
  loading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(addTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addTask.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      let { data } = state;
      state.data = data.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    });
    builder.addCase(updateTask.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      let { data } = state;
      state.loading = false;
      state.data = data.filter((task) => task.id !== action.payload.id);
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(completeTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(completeTask.fulfilled, (state, action) => {
      let { data } = state;
      state.data = data.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      state.loading = false;
    });
    builder.addCase(completeTask.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(incompleteTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(incompleteTask.fulfilled, (state, action) => {
      let { data } = state;
      state.data = data.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      state.loading = false;
    });
    builder.addCase(incompleteTask.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default taskSlice.reducer;

export const getTasks = createAsyncThunk("task/getTasks", async () => {
  const response = await fetch(
    "https://fardanirizkitodoapi.azurewebsites.net/tasks/v1/",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  const data = await response.json();
  return data;
});

export const addTask = createAsyncThunk("task/addTask", async (task) => {
  const response = await fetch(
    `https://fardanirizkitodoapi.azurewebsites.net/tasks/v1/`,
    {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  const data = await response.json();
  return data;
});

export const completeTask = createAsyncThunk(
  "task/completeTask",
  async (id) => {
    const response = await fetch(
      `https://fardanirizkitodoapi.azurewebsites.net/tasks/v1/${id}/complete`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

export const incompleteTask = createAsyncThunk(
  "task/incompleteTask",
  async (id) => {
    const response = await fetch(
      `https://fardanirizkitodoapi.azurewebsites.net/tasks/v1/${id}/incomplete`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

export const updateTask = createAsyncThunk("task/updateTask", async (task) => {
  const response = await fetch(
    `https://fardanirizkitodoapi.azurewebsites.net/tasks/v1/${task.id}`,
    {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  const data = await response.json();
  return data;
});

export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  const response = await fetch(
    `https://fardanirizkitodoapi.azurewebsites.net/tasks/v1/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  const data = await response.json();
  return data;
});
