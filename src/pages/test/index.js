import Head from "next/head";
import Link from "next/link";

const pages = ["welcome"];
const list = [
  "one-lifecycle",
  "two-useeffect",
  "three-container",
  "four-responsive",
  "five-flexbox",
  "eight-headless",
  "welcome2",
  "test-api-route",
  "api-route-rest",
  "react-hook-form-resolvers",
  "react-hook-form-yup",
  "chakra-react-hook-form",
  "learn-promise",
  "use-swr",
  "use-swr-user",
  "toast-hot",
  "chakra-modal",
  "test-react-memo",
];

const PracticeList = () => {
  return (
    <div>
      <h1>Pages</h1>
      {pages.map((item, index) => (
        <div key={`${index}${item}`} style={{ margin: 20 }}>
          <Link href={item}>{`${index + 1}: ${item}`}</Link>
        </div>
      ))}
      <h1>練習 Practice</h1>
      {list.map((item, index) => (
        <div key={`${index}${item}`} style={{ margin: 20 }}>
          <Link href={`/test/${item}`}>{`${index + 1}: ${item}`}</Link>
        </div>
      ))}
    </div>
  );
};

export default PracticeList;
