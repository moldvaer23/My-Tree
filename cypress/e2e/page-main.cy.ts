describe('[TEST]: Work-Space', () => {
	beforeEach(() => {
		/* В начале каждого теста посещаем страницу */
		cy.visit('/')

		/* Проверяем что страница отобразилась */
		cy.get("[data-testid='main-page']").should('exist')
	})

	it('[test]: Создание блока с информацией', () => {
		const button = cy.get('[data-testid="button-block-text"]')

		button.click()

		/* Проверяем есть ли блок с номером 0 на поле */
		cy.get('[data-testid="block-text"]')
	})

	it('[test]: Перемещение блока с информацией', () => {
		const button = cy.get('[data-testid="button-block-text"]')

		/* Создаем два блока */
		button.click()
		button.click()

		/* Проходимся по всем блокам и работает со 2 блоком */
		cy.get('[data-testid="block-text"]').each((element, index) => {
			if (index === 1) {
				const startingPosition = element.offset()

				// Эмулируем нажатие мыши на элемент
				cy.wrap(element).trigger('mousedown', { which: 1 })

				// Эмулируем движение мыши
				cy.document().trigger('mousemove', {
					clientX: startingPosition.left + 200, // сдвиг по X на 200px
					clientY: startingPosition.top + 200, // сдвиг по Y на 200px
				})

				// Эмулируем отпускание мыши
				cy.document().trigger('mouseup', { force: true })

				// Ожидаем, чтобы убедиться, что элемент переместился
				cy.wrap(element).should(($el) => {
					const top = parseFloat($el.css('top'))
					const left = parseFloat($el.css('left'))

					// Проверка, что значение 'top' находится в диапазоне от 340 до 360
					expect(top).to.be.within(340, 360)

					// Проверка, что значение 'left' находится в диапазоне от 150 до 190
					expect(left).to.be.within(150, 250)
				})
			}
		})
	})

	it('[test]: Соединение блока с другим', () => {
		const button = cy.get('[data-testid="button-block-text"]')

		/* Создаем первый блок */
		button.click()

		/* Активируем шлюз у первого блока */
		cy.get('[data-testid="block-text"]')
			.trigger('mouseover')
			.find('[data-testid="gateway-bottom"]')
			.click()

		/* Создаем второй блок */
		button.click()

		/* Проходимся по всем блокам и работает со 2 блоком */
		cy.get('[data-testid="block-text"]').each((element, index) => {
			/* Перемещаем второй блок и кликаем на верхний шлюз */
			if (index === 1) {
				const startingPosition = element.offset()
				// Эмулируем нажатие мыши на элемент
				cy.wrap(element).trigger('mousedown', { which: 1 })

				// Эмулируем движение мыши
				cy.document().trigger('mousemove', {
					clientX: startingPosition.left + 200, // сдвиг по X на 200px
					clientY: startingPosition.top + 200, // сдвиг по Y на 200px
				})

				// Эмулируем отпускание мыши
				cy.document().trigger('mouseup', { force: true })

				/* Активируем шлюз что бы соединить блоки */
				cy.wrap(element).trigger('mouseover')
				cy.wrap(element).find('[data-testid="gateway-top"]').click()
			}
		})

		/* Проверяем была ли создана линия */
		cy.get('[data-testid="connection-line"]')
	})
})
