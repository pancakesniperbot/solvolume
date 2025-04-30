import "./index.css";
import "./components/ui-overrides.css";
declare global {
    interface Window {
        appErrorState?: {
            hasError: boolean;
            errorSeen: boolean;
            lastError: string;
        };
    }
}
