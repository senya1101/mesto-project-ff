/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/card.js":
/*!********************************!*\
  !*** ./src/components/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCard: () => (/* binding */ createCard),\n/* harmony export */   deleteCard: () => (/* binding */ deleteCard),\n/* harmony export */   handleLike: () => (/* binding */ handleLike)\n/* harmony export */ });\nvar cardTemplate = document.querySelector('#card-template').content;\nfunction createCard(card, callbacks) {\n  var cardElement = cardTemplate.querySelector('.card').cloneNode(true);\n  var cardImage = cardElement.querySelector('.card__image');\n  cardImage.src = card.link;\n  cardImage.alt = card.name;\n  cardElement.querySelector('.card__title').textContent = card.name;\n  cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {\n    return callbacks.deleteCard(evt.target.closest('.card'));\n  });\n  cardElement.querySelector('.card__like-button').addEventListener('click', callbacks.handleLike);\n  cardImage.addEventListener('click', callbacks.handleImageClick);\n  return cardElement;\n}\nvar deleteCard = function deleteCard(cardElement) {\n  cardElement.remove();\n};\nfunction handleLike(evt) {\n  if (evt.target.classList.contains('card__like-button')) {\n    evt.target.classList.toggle('card__like-button_is-active');\n  }\n}\n\n//# sourceURL=webpack://mesto-project-ff/./src/components/card.js?");

/***/ }),

/***/ "./src/components/modal.js":
/*!*********************************!*\
  !*** ./src/components/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeModal: () => (/* binding */ closeModal),\n/* harmony export */   openModal: () => (/* binding */ openModal)\n/* harmony export */ });\nfunction overlayClickHandler(evt) {\n  if (!evt.target.closest('.popup__content')) {\n    closeModal(evt.currentTarget);\n  }\n}\nfunction escapeClickHandler(evt) {\n  if (evt.key === 'Escape') {\n    var activeModal = document.querySelector('.popup_is-opened');\n    closeModal(activeModal);\n  }\n}\nfunction openModal(modal) {\n  modal.classList.add(\"popup_is-animated\"); // сначала анимация\n  setTimeout(function () {\n    modal.classList.add(\"popup_is-opened\"); // потом только открытие\n  }, 1);\n  modal.addEventListener('click', overlayClickHandler);\n  document.addEventListener('keydown', escapeClickHandler);\n}\nfunction closeModal(modal) {\n  modal.classList.replace('popup_is-opened', 'popup_is-animated');\n  document.removeEventListener('keydown', escapeClickHandler);\n  modal.removeEventListener('click', overlayClickHandler);\n}\n\n//# sourceURL=webpack://mesto-project-ff/./src/components/modal.js?");

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto-project-ff/./src/pages/index.css?");

/***/ }),

/***/ "./src/scripts/cards.js":
/*!******************************!*\
  !*** ./src/scripts/cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initialCards: () => (/* binding */ initialCards)\n/* harmony export */ });\nvar initialCards = [{\n  name: \"Архыз\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg\"\n}, {\n  name: \"Челябинская область\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg\"\n}, {\n  name: \"Иваново\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg\"\n}, {\n  name: \"Камчатка\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg\"\n}, {\n  name: \"Холмогорский район\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg\"\n}, {\n  name: \"Байкал\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg\"\n}];\n\n//# sourceURL=webpack://mesto-project-ff/./src/scripts/cards.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _components_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/card */ \"./src/components/card.js\");\n/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cards */ \"./src/scripts/cards.js\");\n/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/modal */ \"./src/components/modal.js\");\n\n\n\n\nvar cardsList = document.querySelector('.places__list');\nvar newCardModal = document.querySelector('.popup_type_new-card');\nvar imageModal = document.querySelector('.popup_type_image');\nvar editProfileModal = document.querySelector('.popup_type_edit');\nvar imageModalImage = imageModal.querySelector('.popup__image');\nvar imageModalCaption = imageModal.querySelector('.popup__caption');\nvar editProfileForm = document.forms['edit-profile'];\nvar profileName = document.querySelector('.profile__title');\nvar profileNameInput = editProfileForm.elements.name;\nvar profileDescription = document.querySelector('.profile__description');\nvar profileDescriptionInput = editProfileForm.elements.description;\nvar newPlaceForm = document.forms['new-place'];\nfunction handleImageClick(evt) {\n  imageModalImage.src = evt.target.src;\n  imageModalImage.alt = evt.target.alt;\n  imageModalCaption.textContent = evt.target.alt;\n  (0,_components_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)(imageModal);\n}\nfunction renderCard(item) {\n  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"prepend\";\n  var cardElement = (0,_components_card__WEBPACK_IMPORTED_MODULE_1__.createCard)(item, {\n    deleteCard: _components_card__WEBPACK_IMPORTED_MODULE_1__.deleteCard,\n    handleLike: _components_card__WEBPACK_IMPORTED_MODULE_1__.handleLike,\n    handleImageClick: handleImageClick\n  });\n  cardsList[method](cardElement);\n}\n_cards__WEBPACK_IMPORTED_MODULE_2__.initialCards.forEach(function (card) {\n  renderCard(card, \"append\");\n});\ndocument.querySelector('.profile__add-button').addEventListener('click', function () {\n  (0,_components_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)(newCardModal);\n});\ndocument.querySelector('.profile__edit-button').addEventListener('click', function () {\n  (0,_components_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)(editProfileModal);\n  profileNameInput.value = profileName.textContent;\n  profileDescriptionInput.value = profileDescription.textContent;\n});\ndocument.querySelectorAll('.popup__close').forEach(function (cur) {\n  cur.addEventListener('click', function () {\n    return (0,_components_modal__WEBPACK_IMPORTED_MODULE_3__.closeModal)(cur.closest('.popup'));\n  });\n});\neditProfileForm.addEventListener('submit', function (evt) {\n  evt.preventDefault();\n  profileName.textContent = profileNameInput.value;\n  profileDescription.textContent = profileDescriptionInput.value;\n  (0,_components_modal__WEBPACK_IMPORTED_MODULE_3__.closeModal)(editProfileModal);\n});\nnewPlaceForm.addEventListener('submit', function (evt) {\n  evt.preventDefault();\n  var placeNameInput = newPlaceForm.elements['place-name'];\n  var placeLinkInput = newPlaceForm.elements.link;\n  renderCard({\n    name: placeNameInput.value,\n    link: placeLinkInput.value\n  });\n  newPlaceForm.reset();\n  (0,_components_modal__WEBPACK_IMPORTED_MODULE_3__.closeModal)(newCardModal);\n});\n\n//# sourceURL=webpack://mesto-project-ff/./src/scripts/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/index.js");
/******/ 	
/******/ })()
;