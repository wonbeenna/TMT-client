export const ValidationEmail = (str: string) => {
  const regex =
    /([\w-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
      str
    );
  return regex;
};

export const ValidationPassword = (str: string) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
      str
    );
  return regex;
};

export const ValidationName = (str: string) => {
  const regex = /^[가-힣a-zA-Z]+$/.test(str);
  return regex;
};
