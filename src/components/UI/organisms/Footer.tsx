import styled from "styled-components";

const StyledFooter = styled.footer`
  height: "100px";
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #978e36c8;
  padding: 45px;
  >ul {
    display: flex;
    justify-content: space-evenly;
  }
`;
const Footer = () => {
  return (
    <StyledFooter>
      <span>&copy;2024 by Laurynas</span>
      <div>
        <a href=""><i className="bi bi-facebook"></i> </a>
        <a href=""><i className="bi bi-instagram"></i> </a>
        <a href=""><i className="bi bi-twitter"></i> </a>
        <a href=""><i className="bi bi-youtube"></i> </a>
      </div>
      <i>Cookies</i>
      <i>Privacy Policy</i>
      <i>Terms and Uses</i>
    </StyledFooter>
  );
}

export default Footer;