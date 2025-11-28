import "react-checkbox-tree/lib/react-checkbox-tree.css";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../actions";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoMdAddCircle,
  IoIosCreate,
  IoIosRemoveCircle,
} from "react-icons/io";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import "./style.css";
function Category() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const category = useSelector((state) => state.category);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const addNewCategoryHandler = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categoryList) => {
    let categories = [];
    for (let category of categoryList) {
      categories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return categories;
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const updateCategoryHandler = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };
  const updateCheckedAndExpandedCategories = () => {
    const _checkedArray = [];
    const _expandedArray = [];
    const _categories = createCategoryList(category.categories);
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = _categories.find((cate, _id) => {
          return categoryId === cate.value;
        });
        category && _checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = _categories.find((cate, _id) => {
          return categoryId === cate.value;
        });
        category && _expandedArray.push(category);
      });
    setExpandedArray(_expandedArray);
    setCheckedArray(_checkedArray);
  };
  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpArray);
    }
  };
  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form));
    setUpdateCategoryModal(false);
  };
  const deleteCategoryHandler = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };
  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
        }
      });
    }
    setDeleteCategoryModal(false);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <span>Actions: </span>
                <button onClick={handleShow}>
                  <IoMdAddCircle /> <span>Add</span>
                </button>
                <button onClick={deleteCategoryHandler}>
                  <IoIosRemoveCircle /> <span>Delete</span>
                </button>
                <button onClick={updateCategoryHandler}>
                  <IoIosCreate /> <span>Edit</span>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <CheckboxTree
            nodes={renderCategories(category.categories)}
            checked={checked}
            expanded={expanded}
            onCheck={setChecked}
            onExpand={setExpanded}
            icons={{
              check: <IoIosCheckbox />,
              uncheck: <IoIosCheckboxOutline />,
              halfCheck: <IoIosCheckboxOutline />,
              expandClose: <IoIosArrowForward />,
              expandOpen: <IoIosArrowDown />,
            }}
          />
        </Row>
      </Container>
      <UpdateCategoriesModal
        modalTitle={"Update Categories"}
        size={"lg"}
        handleClose={() => setUpdateCategoryModal(false)}
        handleSubmit={updateCategoriesForm}
        show={updateCategoryModal}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={createCategoryList(category.categories)}
      />
      <AddCategoryModal
        show={show}
        handleClose={() => setShow(false)}
        modalTitle={"Add New Category"}
        handleSubmit={addNewCategoryHandler}
        categoryList={createCategoryList(category.categories)}
        categoryName={categoryName}
        setCategoryImage={setCategoryImage}
        onChange={(field, value) => {
          if (field === "name") setCategoryName(value);
          if (field === "id") setParentCategoryId(value);
          if (field === "drop-id") setParentCategoryId(value);
        }}
      />
      <DeleteCategoryModal
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        modalTitle={"Confirm"}
        size={"lg"}
        deleteCategories={deleteCategories}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
      />
    </Layout>
  );
}

export default Category;
