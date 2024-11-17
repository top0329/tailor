import { create } from "zustand";

export { useAlertService };

const alertStore = create<IAlertStore>(() => ({}));

function useAlertService(): IAlertService {
  const { alert } = alertStore();

  return {
    alert,
    success: (message: string, showAfterRedirect = false) => {
      const type = "alert-success";
      alertStore.setState({
        alert: { type, message, showAfterRedirect },
      });
    },
    error: (message: string, showAfterRedirect = false) => {
      const type = "alert-danger";
      alertStore.setState({
        alert: { type, message, showAfterRedirect },
      });
    },
    clear: () => {
      alertStore.setState((state) => {
        let alert = state.alert;

        // If showAfterAlert is true the alert is kept for one route change
        if (alert?.showAfterRedirect) {
          alert.showAfterRedirect = false;
        } else {
          alert = undefined;
        }

        return { alert };
      });
    },
  };
}

interface IAlert {
  type: string;
  message: string;
  showAfterRedirect: boolean;
}

interface IAlertStore {
  alert?: IAlert;
}

interface IAlertService extends IAlertStore {
  success: (message: string, showAfterRedirect?: boolean) => void;
  error: (message: string, showAfterRedirect?: boolean) => void;
  clear: () => void;
}
