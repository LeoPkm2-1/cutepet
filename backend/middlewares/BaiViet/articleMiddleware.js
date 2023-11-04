const { Response } = require("../../utils");
const NOT_HAVE_TITLE_ERR = "Tiêu đề không được để trống";
const NOT_HAVE_MAIN_IMG_ERR = "Bài chiase kiến thức phải có ảnh chính";
const NOT_HAVE_CONTENT_ERR = "Nội dung bài viết không được để trống";
const NOT_HAVE_CATEGORIES_ERR = "bài chia sẻ không có thể loại";
const WRONG_INTRO_ERR = "intro phải là string";

function hasStringContent(param) {
  return typeof param == "string" && param.length > 0;
}
function hasArrayContent(param) {
  return Array.isArray(param) && param.length > 0;
}

async function preProcessAddArtticle(req, res, next) {
  //   console.log(req.body);
  const { title, main_image, intro, content, categories } = req.body;
  try {
    // check content of variables
    if (!hasStringContent(title)) throw new Error(NOT_HAVE_TITLE_ERR);
    if (!hasStringContent(main_image)) throw new Error(NOT_HAVE_MAIN_IMG_ERR);
    if (!hasStringContent(content)) throw new Error(NOT_HAVE_CONTENT_ERR);
    if (!hasArrayContent(categories)) throw new Error(NOT_HAVE_CATEGORIES_ERR);
    if (intro && typeof intro != "string") throw new Error(WRONG_INTRO_ERR);
    req.body.intro = intro || "";
    next();
    return;
  } catch (error) {
    switch (error.message) {
      case NOT_HAVE_TITLE_ERR:
        res
          .status(400)
          .json(new Response(400, [], NOT_HAVE_TITLE_ERR, 300, 300));
        return;
      case NOT_HAVE_MAIN_IMG_ERR:
        res
          .status(400)
          .json(new Response(400, [], NOT_HAVE_MAIN_IMG_ERR, 300, 300));
        return;
      case NOT_HAVE_CONTENT_ERR:
        res
          .status(400)
          .json(new Response(400, [], NOT_HAVE_CONTENT_ERR, 300, 300));
        return;
      case NOT_HAVE_CATEGORIES_ERR:
        res
          .status(400)
          .json(new Response(400, [], NOT_HAVE_CATEGORIES_ERR, 300, 300));
        return;
      case WRONG_INTRO_ERR:
        res.status(400).json(new Response(400, [], WRONG_INTRO_ERR, 300, 300));
        return;
      default:
        console.log(error);
        break;
    }
  }
}

module.exports = {
  preProcessAddArtticle,
};
