import create, { State } from "zustand";
import produce from "immer";
import { notify } from "../utils/notifications"; // Use named import

interface NotificationStore extends State{
  notifications: Array<{
    type: string;
    message: string;
    description?: string;
    txid?: string;
  }>;
  set: (x: any)=> void; 
}

const useNotificationStore = create<NotificationStore>((set, _get) => ({
  notifications: [],

  set: (fn)=> set(produce(fn)),  
}));

export default useNotificationStore;
