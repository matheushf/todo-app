import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "./router";
import { Theme } from "@radix-ui/themes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Theme
      accentColor="violet"
      grayColor="sand"
      panelBackground="solid"
      appearance="dark"
    >
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Theme>
  );
}

export default App;
