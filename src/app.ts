import GmailMessage = GoogleAppsScript.Gmail.GmailMessage;

const searchQuery = 'subject: 【gas_mail_replier】'; // メール検索する際の検索クエリ
const nameAddressReg = /名前（漢字）：(?<target>.+)/; // 名前欄の表現（正規表現）
const emailAddressReg = /メールアドレス：(?<target>.+)/; // メアド欄の表現（正規表現）
const telAddressReg = /ＴＥＬ：(?<target>.+)/; // 電話番号欄の表現（正規表現）
const replySubject = '件名を入れてください'; // 返信するメールの件名
const replyBodyText = `
（このメールは自動送信です。返信しないでください）
お問合せありがとうございます。
確認後メール送信します。
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const main = () => {
  const query = `${searchQuery} is:unread`;
  const threads = GmailApp.search(query, 0, 10);
  threads.forEach((thread) => {
    thread.getMessages().forEach((message) => {
      // メール内容の解析
      const parsed = parse(message);

      // メール送信
      if (parsed.email) {
        sendMail(parsed.email);
      }

      // 処理済みにする
      markRead(message);
    });
  });
};

/**
 * メール本文を解析し、必要な要素を返す
 */
const parse = (
  message: GmailMessage
): {
  subject: string;
  name: string | null;
  email: string | null;
  tel: string | null;
} => {
  const plainBody = message.getPlainBody();

  const nameMatch = plainBody.match(nameAddressReg)?.groups ?? {};
  const emailMatch = plainBody.match(emailAddressReg)?.groups ?? {};
  const telMatch = plainBody.match(telAddressReg)?.groups ?? {};

  return {
    subject: message.getSubject(),
    name: nameMatch.target || null,
    email: emailMatch.target || null,
    tel: telMatch.target || null,
  };
};

/**
 * メール送信する
 */
const sendMail = (email: string) => {
  GmailApp.sendEmail(email, replySubject, replyBodyText);
};

/**
 * 既読にすることで、次回以降の処理対象から省く
 */
const markRead = (message: GmailMessage) => {
  message.markRead();
};
