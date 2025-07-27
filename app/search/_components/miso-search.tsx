'use client'
import { useEffect } from 'react'
import { dateFormatter } from '@/utils/data-process'
import { MISO_API_KEY } from '@/constants/config'
import '@/shared-styles/search.css'

export default function MisoSearch() {
  useEffect(() => {
    const misocmd = window.misocmd || (window.misocmd = [])
    misocmd.push(async () => {
      // setup client
      const MisoClient = window.MisoClient
      const client = new MisoClient(MISO_API_KEY)
      const workflow = client.ui.hybridSearch
      workflow.useApi({
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
      })
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
          options: [
            { field: 'relevance', text: '關聯性', default: true },
            { field: 'published_at', text: '由新到舊' },
          ],
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
          <a class="miso-list__item-body" data-role="item" data-miso-product-id="${
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
          `<div class="miso-hybrid-search-combo__search-results-filters__right"><div class="miso-hybrid-search-combo__search-results-filters__sort-header">Sort</div><miso-sort></miso-sort></div>`
        )
        return html
      }
      templates = insertElement(templates)
      const wireAnswerBox = defaults.wireAnswerBox

      const rootElement = document.querySelector('#miso-hybrid-search-combo')
      if (rootElement) rootElement.innerHTML = templates

      wireAnswerBox(client, rootElement)

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
