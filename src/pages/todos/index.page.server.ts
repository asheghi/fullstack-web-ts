import { provideTelefuncContext } from "telefunc";
import { loadData } from "./todos.telefunc";

export async function onBeforeRender({ session }: { session: any }) {
  provideTelefuncContext({ session });
  const { todoItems } = await loadData();

  return {
    pageContext: {
      pageProps: {
        todoItemsInitial: todoItems,
      },
    },
  };
}
