function ArrangeBox() {    
    const availableList = [{'name': 'Nice box', 'price': 45},
                        {'name': 'Shorts', 'price': 47},
                        {'name': 'Beatiful box', 'price': 49},
                        {'name': 'jeans', 'price': 55},
                        {'name': 'Socks', 'price': 45},
                        {'name': 'Dollar', 'price': 47},
                        {'name': 'Trousers', 'price': 49},
                        {'name': 'Happy box', 'price': 55},];

    const selectedList = [{'name': 'Topic', 'price': 45},
                        {'name': 'toy', 'price': 47},
                        {'name': 'teddy bear', 'price': 49},
                        {'name': 'funny bee', 'price': 55}];

    let availableListTemp;
    let selectedListTemp;

    // Вставляются все элементы переданного списка
    const insertListItems = (listName) => {
        if (listName === 'available') {
            insertHtml(document.querySelector(`.arrange-box${arrangeNumber}__left-column .column__list`).innerHTML = '');
            availableListTemp.forEach( (listItem, index) => {
                insertHtml(document.querySelector(`.arrange-box${arrangeNumber}__left-column .column__list`), `
                <li class="column__list-item item" draggable="true" pos-left=${index} selected-flag=${false}>
                    <h3 class="item__name">${listItem.name}</h3>
                    <p class="item__price">$${listItem.price}</p>
                </li>`);
            });
        } else if (listName === 'selected') {
            insertHtml(document.querySelector(`.arrange-box${arrangeNumber}__right-column .column__list`).innerHTML = '');
            selectedListTemp.forEach( (listItem, index) => {
                insertHtml(document.querySelector(`.arrange-box${arrangeNumber}__right-column .column__list`), `
                <li class="column__list-item item" draggable="true" pos-right=${index} selected-flag=${false}>
                    <h3 class="item__name">${listItem.name}</h3>
                    <p class="item__price">$${listItem.price}</p>
                </li>`);
            });
        }
    }

    // Разобраться как работает эта функция
    function getDragAfterElement(container, y) {
       const draggableElements = [...container.querySelectorAll(`.arrange-box${arrangeNumber} .item:not(.selected)`)];
       return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
               return { offset: offset, element: child};
            } else {
                return closest;
            }
       }, { offset: Number.NEGATIVE_INFINITY }).element;
    };

    function insertSearchList (parent, list) {
        let text = '';
        list.forEach( (listItem, index) => {
            text += `
            <li class="column__list-item item" draggable="true" pos-left=${index} selected-flag=${false}>
                <h3 class="item__name">${listItem.name}</h3>
                <p class="item__price">$${listItem.price}</p>
            </li>`
        })
        parent.innerHTML = text;
    }

    const addEventsButtons = () => {
        const buttonsSearch = document.querySelectorAll(`.arrange-box${arrangeNumber} .column__search-button`);
        buttonsSearch.forEach( (buttonsSearch, index) => {
            if (index === 0 ) {
                buttonsSearch.addEventListener('click', () => {
                    const text = document.querySelector(`.arrange-box${arrangeNumber} .column__search-text`).value.toLowerCase();
                    let resultArray;
                    if (text ==='') {
                        resultArray = availableListTemp;
                    } else {
                        resultArray = availableListTemp.filter( (listItem) => {
                            if (listItem.name.toLowerCase().indexOf(text) === -1) {
                                return false;
                            }
                            return true;
                        })
                    }
                    console.log(resultArray);
                    insertSearchList(document.querySelector(`.arrange-box${arrangeNumber}__left-column .column__list`), resultArray);
                    addEventsElements();
                });
            } else {
                buttonsSearch.addEventListener('click', () => {
                    const text = document.querySelectorAll(`.arrange-box${arrangeNumber} .column__search-text`)[1].value.toLowerCase();
                    let resultArray;
                    if (text ==='') {
                        resultArray = selectedListTemp;
                    } else {
                        resultArray = selectedListTemp.filter( (listItem) => {
                            if (listItem.name.toLowerCase().indexOf(text) === -1) {
                                return false;
                            }
                            return true;
                        })
                    }
                    console.log(resultArray);
                    insertSearchList(document.querySelector(`.arrange-box${arrangeNumber}__right-column .column__list`), resultArray);
                    addEventsElements();
                });
            }
        })
    }

    function changeArrays(dragItem) {
        const leftColumnList = [...document.querySelectorAll(`.arrange-box${arrangeNumber}__left-column .item`)];
        // console.log(availableListTemp);
        // console.log(selectedListTemp);
        if (availableListTemp.length < leftColumnList.length) {
            availableListTemp.push({ name: dragItem.firstElementChild.textContent, price: Number(dragItem.lastElementChild.textContent.slice(1))});
            selectedListTemp =  selectedListTemp.filter( (listItem) => {
                if (dragItem.firstElementChild.textContent === listItem.name &&
                    Number(dragItem.lastElementChild.textContent.slice(1)) === listItem.price) {
                        return false;
                }
                return true;
            });
        } else if (availableListTemp.length > leftColumnList.length) {
            availableListTemp =  availableListTemp.filter( (listItem) => {
                if (dragItem.firstElementChild.textContent === listItem.name &&
                    Number(dragItem.lastElementChild.textContent.slice(1)) === listItem.price) {
                        return false;
                }
                return true;
            });
            selectedListTemp.push({ name: dragItem.firstElementChild.textContent, price: Number(dragItem.lastElementChild.textContent.slice(1))});
        }
        // console.log(selectedListTemp);
        // console.log(availableListTemp);
        

    }

    const addEventsElements = () => {
        const dragItems = document.querySelectorAll(`.arrange-box${arrangeNumber} .item`);
        console.log(dragItems);
        const dragZones = document.querySelectorAll(`.arrange-box${arrangeNumber} .column__list`);

        dragItems.forEach( dragItem => {
            dragItem.addEventListener('dragstart', () => {
                dragItem.classList.add('selected');
            });
            dragItem.addEventListener('dragend', () => {
                dragItem.classList.remove('selected');
                changeArrays(dragItem);
            });
            dragItem.addEventListener('click', () => {
                if (dragItem.getAttribute('selected-flag') === 'true') {
                    dragItem.setAttribute('selected-flag', `${false}`);
                    dragItem.classList.remove('active');
                } else {
                    dragItem.setAttribute('selected-flag', `${true}`);
                    dragItem.classList.add('active');
                }
            });
        });

        dragZones.forEach( dragZone => {
            dragZone.addEventListener('dragover', e => {
                e.preventDefault();
                const afterElement = getDragAfterElement(dragZone, e.clientY);
                const draggeble = document.querySelector(`.arrange-box${arrangeNumber} .selected`);
                if (afterElement == null) {
                    dragZone.appendChild(draggeble);
                    // Поменять значения в массиве
                } else {
                    // Менять значения в массиве
                    dragZone.insertBefore(draggeble, afterElement);
                }
            });
        })
    }

    // Вставляет детский блок внутрь родительского
    const insertHtml = (parentBlock, childrenBlock) => {
        parentBlock.innerHTML += childrenBlock;
    }

    // Создаётся левое поле контрола
    const createLeftField = () => {
        insertHtml(document.querySelector(`.arrange-box${arrangeNumber}`), `<div class="arrange-box${arrangeNumber}__left-column column"</div>`);
        insertHtml(document.querySelector(`.arrange-box${arrangeNumber}__left-column`), `<h2 class="column__title">Available</h2>
        <div class="column__search">
            <input type="search" class="column__search-text" placeholder="Search by name">
            <button class="column__search-button">&#128270;</button>
        </div>
        <ul class="column__list" data-zone=${1}></ul>`);
        insertListItems('available');
    }

    // Создаётся правое поле контрола
    const createRightField = () => {
        insertHtml(document.querySelector(`.arrange-box${arrangeNumber}`), `
        <div class="arrange-box${arrangeNumber}__right-column column"></div>`)
        insertHtml(document.querySelector(`.arrange-box${arrangeNumber}__right-column`), `<h2 class="column__title">Selected</h2>
        <div class="column__search">
            <input type="search" class="column__search-text" placeholder="Search by name">
            <button class="column__search-button">&#128270;</button>
        </div>
        <ul class="column__list" data-zone=${2}></ul>`);
        insertListItems('selected');
    }

    let arrangeNumber = null;

    // Создаётся контрол
    this.create = (number) => {
        arrangeNumber = number;
        const containerBlock = document.querySelector('.container');
        containerBlock.innerHTML += `<div class='arrange-box${arrangeNumber} arrange-box'></div>`
        availableListTemp = availableList.slice(0);
        // console.log(availableListTemp);
        selectedListTemp = selectedList.slice(0);
        createLeftField();
        createRightField();
        addEventsButtons();
        addEventsElements();
    }

    // Программная возможность
    this.addAvailableItem = (name, price) => {
        availableListTemp.push({name: name, price: price});
        insertListItems('available');
        insertListItems('selected');
        addEventsButtons();
        addEventsElements();
    }

    this.getCurrentElements = () => {
        return [...document.querySelectorAll('.active')];
    }

    this.resetChanges = () => {
        selectedListTemp = selectedList;
        availableListTemp = availableList;
        insertListItems('available');
        insertListItems('selected');
        addEventsButtons();
        addEventsElements();
    }


}

const controlArrangeBox = new ArrangeBox();
controlArrangeBox.create(1);

document.querySelectorAll('.button-classic').forEach( (currentButton, index) => {
    if (index === 0) {
        currentButton.addEventListener('click', () => {
            controlArrangeBox.resetChanges();
        });
    }
    if (index === 1) {
        currentButton.addEventListener('click', () => {
            controlArrangeBox.addAvailableItem('You box', 59);
        });
    }
    if (index === 2) {
        currentButton.addEventListener('click', () => {
            console.log(controlArrangeBox.getCurrentElements());
        });
    }
    if (index === 3) {
        currentButton.addEventListener('click', () => {
            let temp = new ArrangeBox();
            temp.create(2);
        });
    }
    
})
