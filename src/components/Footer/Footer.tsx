import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <img src="img/Logo005.png" alt="logo" />
      <div className="team">
        <div className="contact">
          <a
            target="_blank"
            href="https://github.com/codestates/TMT-client"
            rel="noreferrer"
          >
            Repository
          </a>
          <a
            target="_blank"
            href="https://github.com/codestates/TMT-client/wiki"
            rel="noreferrer"
          >
            WiKi
          </a>
        </div>
        <div className="member">
          <a
            target="_blank"
            href="https://github.com/baymaxxxxx"
            rel="noreferrer"
          >
            김지은 @Git
          </a>
          <a
            target="_blank"
            href="https://github.com/wonbeenna"
            rel="noreferrer"
          >
            나원빈 @Git
          </a>
        </div>
        <div className="member">
          <a
            target="_blank"
            href="https://github.com/Lee-SangRyeol"
            rel="noreferrer"
          >
            이상렬 @Git
          </a>
          <a
            target="_blank"
            href="https://github.com/yoolee741"
            rel="noreferrer"
          >
            이유림 @Git
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
