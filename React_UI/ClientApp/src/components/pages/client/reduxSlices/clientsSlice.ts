//Helpers
import { SelectChangeEvent } from "@mui/material";
import {
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import ClientApi from "../../../../apis/implementations/ClientApi";
import { IClientApi } from "../../../../apis/interfaces/IClientApi";
import { Client } from "../../../../models/entities/Client";
import AppStatus from "../../../../models/helpers/AppStatus";
import { createNewClient } from "../../../../models/helpers/entityHelpers/clientHelper";

//Redux
import { RootState } from "../../../../redux/store";

// Third Party

const clientApi: IClientApi = new ClientApi();

export interface ClientState {
  clientToSave: Client;
  clients: Client[];
  error: string | undefined;
  isNewClient: boolean;
  selectedClient?: Client;
  status: AppStatus;
}

const initialState: ClientState = {
  clientToSave: createNewClient(),
  clients: [],
  error: "",
  isNewClient: true,
  selectedClient: createNewClient(),
  status: AppStatus.Idle,
};

//----------THUNKS----------
export const addClient = createAsyncThunk(
  "clients/add",
  async (newClient: any, { rejectWithValue }) => {
    interface addClientResponse {
      wasSuccessful: boolean;
      statusMessages: [any];
    }

    try {
      const response: addClientResponse = await clientApi.addWithValidations(
        newClient,
      );
      if (response.wasSuccessful != true) {
        throw rejectWithValue(response.statusMessages[0]);
      }
      return "Success";
    } catch (e) {
      return e;
    }
  },
);

export const createClient = createAsyncThunk(
  "clients/createClient",
  async () => {
    const response = await createNewClient();
    return response;
  },
);

export const deleteClient = createAsyncThunk(
  "clients/delete",
  async (client: any, { rejectWithValue }) => {
    try {
      const response = await clientApi.deleteWithValidations(client);
      if (response != "Success") {
        throw rejectWithValue(response);
      }
      return response;
    } catch (e) {
      return e;
    }
  },
);

export const getAll = createAsyncThunk("clients/getAll", async () => {
  let response = await clientApi.getAll();
  response.forEach((c: Client) => {
    c.createDateTime = new Date(c.createDateTime);
    c.createDateTime.setHours(0, 0, 0, 0);
    c.updateDateTime = new Date(c.updateDateTime);
    c.updateDateTime.setHours(0, 0, 0, 0);
  });
  response = response.sort((a: Client, b: Client) =>
    a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1,
  );
  return response;
});

export const getClientById = createAsyncThunk(
  "clients/getClientById",
  async (id: string) => {
    const response = await clientApi.getById(id);
    return response;
  },
);

export const getDetailsClientById = createAsyncThunk(
  "clients/getDetailsClientById",
  async (id: string) => {
    const response = await clientApi.getById(id);
    return response;
  },
);

export const updateClient = createAsyncThunk(
  "clients/update",
  async (
    { client, userName }: { client: Client; userName: string },
    { rejectWithValue },
  ) => {
    const updatedClient = { ...client, updateUser: userName };
    try {
      const response = await clientApi.updateWithValidations(updatedClient);
      if (response != "Success") {
        throw rejectWithValue(response);
      }
      return response;
    } catch (e) {
      return e;
    }
  },
);

//----------Actions----------
export const resetClientToSave = createAction(
  "client/resetClientToSave",
  () => {
    return {
      payload: {
        clientToSave: initialState.clientToSave,
        selectedClient: initialState.selectedClient,
      },
    };
  },
);

export const updateCreatedByUserName = createAction(
  "clients/updateCreatedByUserName",
  (client: Client, userName: string) => {
    return {
      payload: {
        createUser: client.createUser?.concat(userName),
      },
    };
  },
);

export const updateNameProperty = createAction(
  "clients/updateNameProperty",
  (
    e:
    | SelectChangeEvent<string>
    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    return {
      payload: {
        event: e,
      },
    };
  },
);

export const updatePrefixProperty = createAction(
  "clients/uppdatePrefixProperty",
  (
    e:
    | SelectChangeEvent<string>
    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    return {
      payload: {
        event: e,
      },
    };
  },
);

export const updateStatusProperty = createAction(
  "clients/updateStatusProperty",
  (client: Client) => {
    return {
      payload: {
        isActive: !client.isActive,
      },
    };
  },
);

export const updateUpdatedByUserName = createAction(
  "clients/updateUpdatedByUserName",
  (client: Client, userName: string) => {
    return {
      payload: {
        updateUser: client.updateUser?.concat(userName),
      },
    };
  },
);

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //ADD CLIENT
      .addCase(addClient.fulfilled, (state, action) => {
        state.status = AppStatus.Idle;
        state.clientToSave = initialState.clientToSave;
      })
      //Create New Client For Details
      .addCase(
        createClient.fulfilled,
        (state, action: any) =>
          void {
            ...state,
            clientToSave: action.payload,
            status: AppStatus.Idle,
          },
      )
      //DELETE
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.status = AppStatus.Idle;
      })
      .addCase(deleteClient.rejected, (state, action: any) => {
        state.error = action.payload;
      })
      //GetAll
      .addCase(getAll.pending, (state, action) => {
        state.status = AppStatus.Loading;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.clients = [];
        state.status = AppStatus.Succeeded;
        state.clients = state.clients.concat(action.payload);
      })
      .addCase(getAll.rejected, (state, action) => {
        state.status = AppStatus.Failed;
      })
      //GET SINGELE
      .addCase(getClientById.fulfilled, (state, action) => {
        state.selectedClient = action.payload;
      })
      //DETAILS
      .addCase(getDetailsClientById.fulfilled, (state, action) => {
        state.status = AppStatus.Idle;
        state.clientToSave = action.payload;
      })
      .addCase(getDetailsClientById.rejected, (state, action: any) => {
        state.status = AppStatus.Failed;
        state.error = action.payload;
      })
      //ResetClientForDetailsScreen
      .addCase(resetClientToSave, (state, action) => {
        state.clientToSave = action.payload.clientToSave;
        state.selectedClient = action.payload.selectedClient;
      })
      //UPDATE
      .addCase(updateClient.fulfilled, (state, action) => {
        state.status = AppStatus.Idle;
        state.clientToSave = initialState.clientToSave;
        state.selectedClient = initialState.selectedClient;
      })
      .addCase(updateClient.rejected, (state, action: any) => {
        state.error = action.payload;
      })
      .addCase(updateCreatedByUserName, (state, action) => {
        state.clientToSave.createUser = action.payload.createUser;
      })
      .addCase(updateNameProperty, (state, action: any) => {
        state.clientToSave.name = action.payload.event.target.value;
      })
      .addCase(updatePrefixProperty, (state, action: any) => {
        state.clientToSave.clientPrefix = action.payload.event.target.value;
      })
      .addCase(updateStatusProperty, (state, action) => {
        state.clientToSave.isActive = action.payload.isActive;
      })
      .addCase(updateUpdatedByUserName, (state, action) => {
        state.clientToSave.updateUser = action.payload.updateUser;
      });
  },
});

//----------Selectors----------
export const selectAllClients = (state: RootState) => state.client.clients;
export const selectClient = (state: RootState) => state.client.selectedClient;
export const selectDetailsClient = (state: RootState) =>state.client.clientToSave;

export function selectIdByClientName(state: RootState, id: string): any {
  return state.client.clients.find((Client) => Client.id == id);
}

export default clientsSlice.reducer;
