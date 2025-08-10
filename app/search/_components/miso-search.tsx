'use client'
import { useEffect } from 'react'
import { dateFormatter } from '@/utils/data-process'
import { MISO_API_KEY } from '@/constants/config'
import '@/shared-styles/search.css'
import { searchGtmEvents } from '@/constants/gtm'

export default function MisoSearch() {
  const sortOptions = [
    { field: 'relevance', text: '關聯性', default: true },
    { field: 'published_at', text: '由新到舊' },
  ]
  useEffect(() => {
    const misocmd = window.misocmd || (window.misocmd = [])
    misocmd.push(async () => {
      // setup client
      const MisoClient = window.MisoClient
      const client = new MisoClient(MISO_API_KEY)
      const workflow = client.ui.hybridSearch

      const apiConfig = {
        fq: 'product_id:/mirrordaily_.+/',
        source_fl: [
          'cover_image',
          'url',
          'created_at',
          'updated_at',
          'published_at',
          'title',
          'section_name',
        ], // 回答的引用文章
        fl: [
          'cover_image',
          'url',
          'created_at',
          'updated_at',
          'published_at',
          'title',
        ],
        snippet_max_chars: 60,
        sort: 'relevance', // 默認排序
      }

      workflow.useApi(apiConfig)
      workflow.useLayouts({
        query: {
          placeholder: 'Ask anything!',
        },
        products: [
          'list',
          {
            templates: {
              product: renderProduct,
            },
          },
        ],
      })
      workflow.useFilters({
        sort: {
          options: sortOptions,
        },
      })

      interface Product {
        id: string | number
        url: string
        cover_image: string
        title: string
        published_at: string | Date
        snippet: string
      }

      function renderProduct(
        layout: object,
        state: object,
        product: Product
      ): string {
        const html = `
          <a class="miso-list__item-body ${searchGtmEvents.article}" data-role="item" data-miso-product-id="${
            product.id
          }" href="${product.url}" target="_blank" rel="noopener">
            <div class="miso-list__item-cover-image-container">
              <img class="miso-list__item-cover-image" src="${
                product.cover_image
              }">
            </div>
            <div class="miso-list__item-info-container">
              <div class='miso-list__item-time'>${dateFormatter(
                product['published_at'].toString()
              )}</div>
              <div class="miso-list__item-title">${product.title}</div>
              <div class="miso-list__item-snippet">${product.snippet}</div>
            </div>
         </a>
       `
        return html
      }
      // wait for styles to be loaded
      await client.ui.ready

      // render DOM and get element references
      const defaults = MisoClient.ui.defaults.hybridSearch
      let templates = defaults.templates.root({ answerBox: true })
      function insertElement(html: string) {
        html = html.replace(
          '<miso-facets></miso-facets>',
          // eslint-disable-next-line tailwindcss/no-custom-classname
          `
          <div class="miso-hybrid-search-combo__search-results-filters__right">
            <div class="miso-hybrid-search-combo__search-results-filters__sort-header">排序依</div>
            <miso-sort style="display: none;"></miso-sort>
            <div class="miso-hybrid-search-combo__search-results-filters__sort-options-container">
            ${sortOptions
              .map((sortItem) => {
                return `<button class="miso-hybrid-search-combo__search-results-filters__sort-option" data-field="${sortItem.field}" key="${sortItem.field}">${sortItem.text}</button>`
              })
              .join('')}
            </div>
          </div>`
        )
        return html
      }
      templates = insertElement(templates)
      const wireAnswerBox = defaults.wireAnswerBox

      const rootElement = document.querySelector('#miso-hybrid-search-combo')
      if (rootElement) rootElement.innerHTML = templates

      wireAnswerBox(client, rootElement)

      // answer box toggle button text
      const handleToggleButtonText = () => {
        const toggleButton = rootElement?.querySelector(
          '.miso-hybrid-search-combo__answer-box-toggle'
        )
        if (toggleButton) {
          toggleButton.textContent = '展開更多'
          toggleButton.addEventListener('click', () => {
            setTimeout(() => {
              const isExpanded =
                rootElement?.classList.contains(
                  'miso-hybrid-search-combo__answer-box-open'
                ) ||
                rootElement?.querySelector(
                  '.miso-hybrid-search-combo__answer-box-open'
                )

              if (isExpanded) {
                toggleButton.textContent = '收合全部'
              } else {
                toggleButton.textContent = '展開更多'
              }
            }, 100)
          })
        }
      }

      // 排序按鈕事件監聽器
      const handleSortButtons = () => {
        const sortButtons = rootElement?.querySelectorAll(
          '.miso-hybrid-search-combo__search-results-filters__sort-option'
        )

        // 設置默認選中的排序選項
        const defaultSortOption = sortOptions.find((option) => option.default)
        if (defaultSortOption) {
          const defaultButton = rootElement?.querySelector(
            `[data-field="${defaultSortOption.field}"]`
          )
          defaultButton?.classList.add('active')
        }

        sortButtons?.forEach((button) => {
          button.addEventListener('click', (e) => {
            const target = e.target as HTMLElement
            const field = target.getAttribute('data-field')

            // 移除所有按鈕的 active 狀態
            sortButtons.forEach((btn) => {
              btn.classList.remove('active')
            })

            // 添加當前按鈕的 active 狀態
            target.classList.add('active')

            // 觸發排序 - 通過隱藏的 miso-sort 元素
            if (field) {
              // 找到隱藏的 miso-sort 元素
              const misoSortElement = rootElement?.querySelector('miso-sort')
              if (misoSortElement) {
                // 找到 miso-sort 內部的選擇按鈕
                const misoSortButton = misoSortElement.querySelector(
                  '.miso-select__button'
                ) as HTMLElement
                if (misoSortButton) {
                  // 點擊 miso-sort 按鈕打開選項
                  misoSortButton.click()

                  // 等待選項出現後選擇對應的選項
                  setTimeout(() => {
                    const misoSortOptions = misoSortElement.querySelectorAll(
                      '.miso-select__option'
                    )
                    misoSortOptions.forEach((option) => {
                      const optionText = option.textContent?.trim()
                      const sortOption = sortOptions.find(
                        (opt) => opt.text === optionText
                      )
                      if (sortOption && sortOption.field === field) {
                        // 點擊對應的選項
                        ;(option as HTMLElement).click()
                      }
                    })
                  }, 100)
                }
              }
            }
          })
        })
      }

      // 等待 DOM 更新後處理按鈕文字和排序按鈕
      setTimeout(() => {
        handleToggleButtonText()
        handleSortButtons()
      }, 100)

      // start query if specified in URL parameters
      setTimeout(() => {
        workflow.autoQuery()
      }, 1000)
    })
  }, [])
  return (
    <div
      id="miso-hybrid-search-combo"
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="miso-hybrid-search-combo"
    ></div>
  )
}
