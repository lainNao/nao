import { ComponentDisplayPanel } from "./components/ComponentDisplayPanel/ComponentDisplayPanel";
import { TextGradient } from "./components/TextGradient/TextGradient";

function App() {
  return (
    <div>
      <div>
        <ComponentDisplayPanel>
          <TextGradient baseHex="#3269cf">
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
          </TextGradient>
        </ComponentDisplayPanel>
      </div>
      <div>
        <ComponentDisplayPanel>
          <TextGradient
            baseHex="#3269cf"
            additionalLight={20}
            additionalShadow={20}
          >
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
          </TextGradient>
        </ComponentDisplayPanel>
      </div>
    </div>
  );
}

export default App;
