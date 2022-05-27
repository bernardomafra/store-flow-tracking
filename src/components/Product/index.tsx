import { useEffect, useState } from "react";
import { useChromeSyncStorage } from "../../hooks/useChromeSyncStorage";
import { notify } from "../../utils/notify";
import readSyncStorageData from "../../utils/readSyncStorageData";
import { IStartFlowData, startFlow } from "../../utils/startFlow";
import Spinner from "../Spinner";

export function Product() {
  const [flowData, setFlowData] = useChromeSyncStorage<IStartFlowData | null>(
    "flowData",
    null,
  );

  console.log("here");
  console.log(flowData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(["flowData"], (result) => {
      console.log(result);
      setFlowData(result.flowData);
    });
  }, []);

  async function start() {
    if (flowData?.product) {
      try {
        const flowData = await readSyncStorageData("flowData");
        await startFlow(flowData);
        setLoading(true);
        notify("Iniciando fluxo", `Product escolhido: ${flowData.product}`, "");
      } catch (error) {
        notify(`Error starting flow for ${flowData.product}`, "", "");
      }
    }
  }

  return flowData?.product ? (
    <section id="product">
      Produto Escolhido:&nbsp;<b>{flowData.product}</b>
      <div id="buttons-group">
        {!loading && (
          <button onClick={() => chrome.runtime.openOptionsPage()}>
            Alterar Produto
          </button>
        )}
        <button disabled={loading} onClick={start}>
          {loading && <Spinner active width="25px" height="25px" />}
          {loading ? "Iniciando..." : "Iniciar"}
        </button>
      </div>
    </section>
  ) : (
    <>
      <button onClick={() => chrome.runtime.openOptionsPage()}>
        Buscar um Produto
      </button>
    </>
  );
}
