import * as cookieUtil from "cookie";

export function authCookieJwt(gssp) {
  return async (context) => {
    const { req, res } = context;
    const headersCookie = req.headers.cookie;

    let isRedirect = false;

    if (!headersCookie) {
      console.log("no cookies");
      isRedirect = true;
    } else {
      const cookiesObj = cookieUtil.parse(headersCookie);
      console.log(cookiesObj);
      // jwt key not exist
      if (!("ar_jwt_token" in cookiesObj)) {
        console.log("no ar_jwt_token");
        isRedirect = true;
      }
      if (!cookiesObj["ar_jwt_token"]) {
        console.log("ar_jwt_token empty");
        isRedirect = true;
      }
    }

    if (isRedirect) {
      // Redirect to login page
      return {
        redirect: {
          destination: "/pteacher/login",
          statusCode: 302,
        },
      };
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}
