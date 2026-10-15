(() => {
  const sections = [...document.querySelectorAll("main .grid > section")];
  const container = document.createElement("nav");
  container.setAttribute("aria-label", "Find brand information");
  const label = document.createElement("label");
  label.textContent = "Find a topic / 查找资料";
  const search = document.createElement("input");
  search.type = "search";
  search.placeholder = "Try: walnut, warranty, delivery / 木材、售后、交期";
  search.style.cssText = "display:block;width:100%;padding:12px;margin:8px 0;font:inherit;border:1px solid #ded5ca;border-radius:6px";
  label.append(search); container.append(label);
  const count = document.createElement("p"); count.setAttribute("role", "status"); container.append(count);
  const links = document.createElement("div"); links.style.cssText = "display:flex;gap:16px;flex-wrap:wrap";
  const aliases = ["品牌 名称 身份 创立 商标", "木材 材质 榉木 樱桃木 黑胡桃 岩板", "质保 保修 售后", "发货 交期 配送 定制"];
  const names = ["identity", "materials", "warranty", "delivery"];
  sections.forEach((section, index) => {
    section.id ||= names[index] || `topic-${index}`;
    const anchor = document.createElement("a"); anchor.href = `#${section.id}`;
    anchor.textContent = section.querySelector(".meta")?.textContent || section.querySelector("h2").textContent;
    anchor.addEventListener("click", () => { search.value = ""; filter(); });
    links.append(anchor);
  });
  container.append(links);
  document.querySelector("main header").after(container);
  function filter() {
    const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    sections.forEach((section, index) => {
      const text = `${section.textContent} ${aliases[index] || ""}`.toLowerCase();
      section.hidden = !words.every(word => text.includes(word));
      if (!section.hidden) visible += 1;
    });
    count.textContent = visible ? `${visible} of ${sections.length} topics · 显示 ${visible} 个主题` : "No matching topic. Try a shorter keyword. / 没有匹配资料，请缩短关键词。";
  }
  search.addEventListener("input", filter);
  window.addEventListener("hashchange", () => { search.value = ""; filter(); });
  filter();
})();
