import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Form, useActionData, useNavigation } from 'react-router';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';

type ActionData = {
  html?: string;
  error?: string;
  userInput?: string;
};

export function DiagramGenerator() {
  const actionData = useActionData() as ActionData | undefined;
  const navigation = useNavigation();
  const diagramRef = useRef<HTMLDivElement>(null);
  const isSubmitting = navigation.state === 'submitting';

  const downloadImage = async () => {
    if (!diagramRef.current) return;

    try {
      const dataUrl = await toPng(diagramRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = 'diagram.png';
      link.href = dataUrl;
      link.click();

      toast.success('図解画像が正常にダウンロードされました', {
        description: '高品質な画像が保存されました',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error('画像のダウンロード中にエラーが発生しました', {
        description: 'もう一度お試しください',
        duration: 3000,
      });
    }
  };

  const copyImageToClipboard = async () => {
    if (!diagramRef.current) return;

    try {
      const dataUrl = await toPng(diagramRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      // データURLから画像を作成
      const img = new Image();
      img.src = dataUrl;

      // 画像が読み込まれるのを待つ
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Canvasを作成して画像を描画
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      // Canvasからblobを取得してクリップボードにコピー
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                [blob.type]: blob,
              }),
            ]);
            toast.success('図解画像がクリップボードにコピーされました', {
              description: '他の場所に貼り付けることができます',
              duration: 3000,
            });
          } catch (err) {
            console.error('クリップボードへのコピーに失敗しました:', err);
            toast.error('クリップボードへのコピーに失敗しました', {
              description: 'ブラウザの権限設定を確認してください',
              duration: 3000,
            });
          }
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error copying image to clipboard:', error);
      toast.error('画像のコピー中にエラーが発生しました', {
        description: 'もう一度お試しください',
        duration: 3000,
      });
    }
  };

  return (
    <div className='container mx-auto p-6 max-w-4xl'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        AI図解ジェネレーター
      </h1>

      <div className='flex flex-col gap-8'>
        <div className='space-y-4'>
          <Form method='post' className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='user-input'>
                図解したい内容を入力してください
              </Label>
              <Textarea
                id='user-input'
                name='userInput'
                placeholder='例: ウェブアプリケーションの開発プロセス'
                className='min-h-[200px]'
                defaultValue={actionData?.userInput || ''}
                disabled={isSubmitting}
                required
              />
            </div>

            <Button type='submit' disabled={isSubmitting} className='w-full'>
              {isSubmitting ? '生成中...' : '図解を生成'}
            </Button>
          </Form>

          {actionData?.error && (
            <div className='p-3 bg-red-50 border border-red-200 rounded-md text-red-600'>
              {actionData.error}
            </div>
          )}
        </div>

        <div className='border rounded-lg p-4 bg-gray-50'>
          {actionData?.html ? (
            <div
              ref={diagramRef}
              className='w-full relative bg-white overflow-hidden shadow-inner rounded-md aspect-video'
            >
              <div className='absolute inset-0 flex items-center justify-center'>
                <div
                  dangerouslySetInnerHTML={{ __html: actionData.html }}
                  className='w-full h-full'
                />
              </div>
            </div>
          ) : (
            <div className='w-full relative bg-white shadow-inner rounded-md aspect-video'>
              <div className='absolute inset-0 flex items-center justify-center text-gray-400'>
                {isSubmitting ? (
                  <div className='flex flex-col items-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4'></div>
                    <p>AIが図解を生成しています...</p>
                  </div>
                ) : (
                  <p>ここに生成された図解が表示されます</p>
                )}
              </div>
            </div>
          )}

          {actionData?.html && (
            <div className='flex gap-2 mt-4'>
              <Button onClick={downloadImage} variant='outline'>
                画像としてダウンロード
              </Button>
              <Button onClick={copyImageToClipboard} variant='outline'>
                クリップボードにコピー
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
