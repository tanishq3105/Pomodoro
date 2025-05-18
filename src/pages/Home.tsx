import Layout  from "../components/Layout/Layout";
import { SettingsProvider } from "../contexts/SettingsContext";
import { TaskProvider } from "../contexts/TaskContext";
import { TimerProvider } from "../contexts/TimerContext";


function Home() {
  return (
    <SettingsProvider>
      <TimerProvider>
        <TaskProvider>
          <Layout/>
        </TaskProvider>
      </TimerProvider>
    </SettingsProvider>
  );
}

export default Home;