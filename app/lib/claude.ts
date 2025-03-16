/**
 * Claude APIを使用して図解用のHTMLを生成するユーティリティ関数
 */

// Claude APIの設定
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || '';
const CLAUDE_MODEL = 'claude-3-7-sonnet-latest';

/**
 * Claude APIを使用して図解用のHTMLを生成する
 * @param prompt ユーザーの入力内容
 * @returns 生成されたHTML
 */
export async function generateDiagramHTML(prompt: string): Promise<string> {
  if (!CLAUDE_API_KEY) {
    throw new Error('Claude API Keyが設定されていません');
  }

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: `以下の内容に基づいて、図解のHTMLを生成してください。

# 基本仕様
- シンプルで美しく、非常にモダンなデザインのグラフィックレコーディングを作成してください

# 重要: この図解はXのポストで使用されるため、以下の仕様に従ってください

## レイアウトと構造
- 厳密に16:9のアスペクト比を維持してください。これは非常に重要です
- ルート要素のdivには style="width: 100%; height: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: center;" のスタイルを設定してください
- 内部の要素も16:9のアスペクト比を維持するよう、width: 100%とheight: auto、またはpadding-bottom: 56.25%などの技術を使用してください
- 図解全体のサイズは親要素に合わせて自動調整されるようにしてください

## テキストと可読性
- 文字サイズは非常に小さめに設定してください（12px〜14pxを基本とし、見出しでも最大16px）
- 特に強調：すべてのテキスト要素は小さく控えめにしてください。大きな文字は使用しないでください
- 背景色は白または淡い色を使用し、テキストは暗い色で十分なコントラストを確保してください
- テキスト要素には必ず適切な余白（padding: 8px〜12px程度）を設定し、読みやすさを確保してください
- 行間（line-height: 1.4〜1.6程度）を十分に取り、テキストの可読性を高めてください
- 段落や項目間には適切なマージン（margin: 8px〜12px程度）を設定し、コンテンツの区切りを明確にしてください

## デザイン要素
- 図解内の要素は適切な余白を持たせ、全体的にバランスの取れたレイアウトにしてください
- 必ず16:9のアスペクト比を維持し、内容量はそれに合わせてください。オーバーするようであれば重要な箇所を残し、それ以外は調整してください。
- 鮮明で高解像度の表示になるよう、すべての要素に明確なボーダーと十分なコントラストを持たせてください
- モダンなデザイン要素として、控えめなグラデーション、シャドウ効果、丸みを帯びた角などを適切に使用してください
- アイコンや図形は小さめで洗練されたものを使用し、全体の調和を保ってください
- 全体的に小さく、コンパクトな要素を使用し、情報密度の高い図解を目指してください

## shadcn/uiスタイルガイドライン
- カード、ボタン、アイコンなどの要素はshadcn/uiのようなミニマルでモダンなデザインに
- 色彩はshadcn/uiのようなニュートラルな色調をベースに、アクセントカラーを控えめに使用
- 要素の角は適度に丸く（border-radius: 6px〜8px程度）
- シャドウは軽く（box-shadow: 0 1px 3px rgba(0,0,0,0.1)程度）
- ボーダーは薄く（1px solid rgba(0,0,0,0.1)程度）

下記は参考にして欲しいグラフィックレコーディングの例です。

-------------------
export default function ProductEngineerGraphic() {
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-500 mb-1">プロダクトエンジニアの思考と役割</h1>
        <p className="text-gray-600 text-sm md:text-base">技術者からプロダクト価値創造者への思考の変化</p>
      </div>

      {/* Formula Section */}
      <div className="bg-gray-50 rounded-3xl p-6 mb-8 flex flex-wrap justify-center items-center gap-2 md:gap-4">
        <div className="bg-white rounded-xl p-3 shadow-sm flex items-center">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-gray-700 text-sm">技術視点</span>
        </div>

        <div className="text-gray-400 text-xl">+</div>

        <div className="bg-white rounded-xl p-3 shadow-sm flex items-center">
          <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-sky-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-gray-700 text-sm">ビジネス視点</span>
        </div>

        <div className="text-gray-400 text-xl">+</div>

        <div className="bg-white rounded-xl p-3 shadow-sm flex items-center">
          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-indigo-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-gray-700 text-sm">思考の変化</span>
        </div>

        <div className="text-gray-400 text-xl">=</div>

        <div className="bg-blue-500 rounded-xl p-3 shadow-sm">
          <span className="text-white font-bold">プロダクト価値向上</span>
        </div>
      </div>

      {/* Three Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div className="bg-blue-100 rounded-xl p-5">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-blue-700">従来のエンジニア思考</h2>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>技術に閉じた視点で考える</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>「何を作るか」に焦点を当てる</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>フロントエンド/バックエンド区分に縛られる</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>技術的な実装に重きを置く</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>指示された内容を実装する</span>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="bg-sky-100 rounded-xl p-5">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-sky-700">プロダクトエンジニア思考</h2>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <span className="text-sky-500 mr-2">•</span>
              <span>プロダクト全体を見渡す視点を持つ</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-500 mr-2">•</span>
              <span>「何を実現するか」に焦点を当てる</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-500 mr-2">•</span>
              <span>ビジネス課題の解決を考える</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-500 mr-2">•</span>
              <span>最適な手段を選択し実行する</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-500 mr-2">•</span>
              <span>プロダクトの価値向上を目的とする</span>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="bg-indigo-100 rounded-xl p-5">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-indigo-700">重要な気づき</h2>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>技術者としての視点を超える必要がある</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>新しい技術を自ら学ぶ姿勢が重要</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>外部の専門家を招く判断も必要</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>思考の変化がプロダクト価値を生む</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>ビジネス視点で課題を捉える力が必須</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
-------------------


内容: ${prompt}

レスポンスは<div>タグから始まるHTMLコードのみを返してください。コメントや説明は含めないでください。`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API Error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();

    // レスポンスからHTMLを抽出
    const content = data.content[0].text;

    // HTMLタグを抽出（<div>から始まる部分を取得）
    const htmlMatch = content.match(/<div[\s\S]*<\/div>/);
    if (!htmlMatch) {
      throw new Error('生成されたコンテンツからHTMLを抽出できませんでした');
    }

    return htmlMatch[0];
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error('図解の生成中にエラーが発生しました');
  }
}
