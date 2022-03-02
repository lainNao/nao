import {
  ComponentDisplayPanel,
  TextDifference,
  TextGradient,
} from "./components";

function App() {
  return (
    <div style={{ backgroundColor: "ghostwhite" }}>
      <ComponentDisplayPanel>
        <TextGradient baseHex="#3269cf">
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
        </TextGradient>
      </ComponentDisplayPanel>

      <Space />

      <ComponentDisplayPanel>
        <TextGradient
          baseHex="#3269cf"
          additionalLight={20}
          additionalShadow={20}
        >
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
        </TextGradient>
      </ComponentDisplayPanel>

      <Space />

      <ComponentDisplayPanel>
        <div
          style={{
            backgroundImage: "url(https://picsum.photos/id/1065/500/300)",
            width: 300,
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontSize: "xxx-large",
          }}
        >
          <TextDifference baseHex="#89a7dd">Sound of silence</TextDifference>
        </div>
      </ComponentDisplayPanel>
    </div>
  );
}

const Space = () => <div style={{ height: 50 }} />;

export default App;
