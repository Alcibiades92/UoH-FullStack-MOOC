import { useReducer, createContext, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE": {
      return `You voted for ${action.payload}`;
    }
    case "CREATE": {
      return `You created the following ${action.payload}`;
    }
    case "ERR": {
      return `${action.payload}`;
    }
    default:
      return "";
  }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
