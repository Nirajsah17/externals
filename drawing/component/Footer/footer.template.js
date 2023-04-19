function getTemplate(o) {
  const config = o || {};
  const html = `
  <div style="position:absolute;bottom:0,left:0">
    <div id="home-footer"> default</div>
    <div id="service-footer">default</div>
    <div id="about-footer">default</div>
    <div id="profile-footer">default</div>
  </div>
  `;
  let template = document.createElement("template");
  template.innerHTML = html;
  return template;
}
export default getTemplate;