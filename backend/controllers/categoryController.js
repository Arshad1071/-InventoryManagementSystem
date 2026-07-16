// controllers/categoryController.js

exports.getCategories = (req, res) => {
    res.json({
      success: true,
      message: "Get all categories",
    });
  };
  
  exports.getCategoryById = (req, res) => {
    res.json({
      success: true,
      message: `Get category ${req.params.id}`,
    });
  };
  
  exports.createCategory = (req, res) => {
    res.json({
      success: true,
      message: "Category created",
      data: req.body,
    });
  };
  
  exports.updateCategory = (req, res) => {
    res.json({
      success: true,
      message: `Category ${req.params.id} updated`,
      data: req.body,
    });
  };
  
  exports.deleteCategory = (req, res) => {
    res.json({
      success: true,
      message: `Category ${req.params.id} deleted`,
    });
  };