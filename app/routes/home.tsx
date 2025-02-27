import type { Route } from "./+types/home";
import { DiagramGenerator } from '../components/DiagramGenerator';
import { generateDiagramHTML } from '../lib/claude';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'AI図解ジェネレーター' },
    {
      name: 'description',
      content: 'AIを使って入力内容から図解を生成するサービス',
    },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const userInput = formData.get('userInput') as string;

  if (!userInput || typeof userInput !== 'string') {
    return { error: '入力内容が必要です' };
  }

  try {
    // Claude APIを使用して図解を生成
    const html = await generateDiagramHTML(userInput);
    return { html, userInput };
  } catch (error) {
    console.error('Error generating diagram:', error);
    return {
      error:
        error instanceof Error
          ? error.message
          : '図解の生成中にエラーが発生しました',
      userInput,
    };
  }
}

export default function Home() {
  return <DiagramGenerator />;
}
