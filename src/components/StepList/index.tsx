import { useState } from "react";
import { StorageSocketData } from "../../global";
import { useChromeSyncStorage } from "../../hooks/useChromeSyncStorage";
import { notify } from "../../utils/notify";
import { IStartFlowData, startFlow } from "../../utils/startFlow";
import ProgressBar from "../Progress";
import Spinner from "../Spinner";

import { Container, Step, Title } from "./styles";

interface StepListProps {
  data: StorageSocketData[];
}

export default function StepList({ data }: StepListProps) {
  const [flowData] = useChromeSyncStorage<IStartFlowData | null>(
    "flowData",
    null,
  );
  const [activeWebsite] = useState<string>("");

  function clear() {
    chrome.storage.sync.set({ dataSocket: [] });
  }

  function reset() {
    if (!flowData?.product)
      return notify("Não existe produto selecionado", "error", "");
    startFlow(flowData);
  }

  function isActive(website: string) {
    return website === activeWebsite;
  }

  function isAFinalizeStep(step: string) {
    console.log({ step, is: step.toLowerCase() === "finalizado" });
    return step.toLowerCase().includes("finalizado");
  }

  return (
    <Container>
      <Title>
        <small id="reset" onClick={reset}>
          Reiniciar
        </small>
        {flowData?.product}
        <small id="clear" onClick={clear}>
          Limpar
        </small>
      </Title>
      <p>Acompanhe as suas buscas em tempo real</p>
      {data.map((item, index) => (
        <li key={item.website}>
          <section id="data">
            <Spinner active={isActive(item.website)} />
            <img src="/rocket.png" alt="website-running-state" />
            <div className="limited-text">
              <Step
                final={isAFinalizeStep(item.step)}
                hasError={item.step.toLowerCase().includes("error")}
              >
                {item.step}
              </Step>
              <a
                className="limited-text"
                rel="noreferrer"
                target="_blank"
                href={item.url}
              >
                {item.title}
              </a>
            </div>
          </section>
          <ProgressBar percentage={item.percentage || 0} />
        </li>
      ))}
    </Container>
  );
}
