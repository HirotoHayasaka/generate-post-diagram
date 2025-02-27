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
- 図解はシンプルで美しく、非常にモダンなデザインにしてください
- HTMLはdivタグ内に収めて、外部ライブラリやスクリプトを使用せず、純粋なHTMLとインラインスタイル（style属性）のみを使用してください
- Tailwind CSSクラスは使用せず、すべてのスタイルはstyle属性で直接指定してください

# 重要: この図解はXのポストで使用されるため、以下の仕様に従ってください

## レイアウトと構造
- タイトルは含めないでください。内容を直接表現する図解のみを生成してください
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
