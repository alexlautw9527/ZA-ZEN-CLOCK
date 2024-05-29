import { useState } from "react";
import { Button } from "@components/units/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
      {count}
    </>
  );
}

export default App;
