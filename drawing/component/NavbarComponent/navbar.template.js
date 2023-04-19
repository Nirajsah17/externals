function getTemplate(o) {
  const config = o || {};
  const html = `
  <div>
  <button id="home">home</button>
  <button id="service">service</button>
  <button id="about">about</button>
  <button id="profile">profile</button>
  </div>
  `;
  let template = document.createElement("template");
  template.innerHTML = html;
  return template;
}
export default getTemplate;