const express = require("express");

const router = express.Router();

const CheckList = require("../models/checkList");

router.get("/", async (req, res) => {
  try {
    let checklist = await CheckList.find({});
    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/new", async (req, res) => {
  try {
    let checklist = new CheckList();
    res.status(200).render("checklists/new", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { errors: "Erro ao carregar o formulário" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let checklist = await CheckList.findById(req.params.id);
    res.status(200).render("checklists/edit", { checklist: checklist });
  } catch (error) {
    res.status(500).render("pages/error", {
      errors: "Erro ao exibir a edição das listas de tarefas",
    });
  }
});

router.post("/", async (req, res) => {
  let { name } = req.body.checklist;

  try {
    let checklist = await CheckList.create({ name });
    res.redirect("/checklists");
  } catch (error) {
    res
      .status(422)
      .render("checklist/new", { checklist: { ...checklist, error } });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let checklist = await CheckList.findById(req.params.id).populate("tasks");
    res.status(200).render("checkLists/show", { checklist: checklist });
  } catch (error) {
    res.status(422).json(error);
  }
});

router.put("/:id", async (req, res) => {
  let { name } = req.body.checkList;
  let checklist = await CheckList.findById(req.params.id);

  try {
    let checklist = await CheckList.update({ name });
    res.redirect("/checklists");
  } catch (error) {
    let errors = error.errors;
    res
      .status(422)
      .render("checklist/edit", { checklist: { ...checklist, errors } });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let checklist = await CheckList.findByIdAndUpdate(req.params.id);
    res.redirect("/checklists");
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { errors: "Erro ao deletar a lista de tarefas" });
  }
});

module.exports = router;
