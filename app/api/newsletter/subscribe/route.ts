import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'
import crypto from 'crypto'
import {
  MAILCHIMP_API_KEY,
  MAILCHIMP_SERVER_PREFIX,
  MAILCHIMP_LIST_ID,
} from '@/constants/config'

export const dynamic = 'force-dynamic'

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_PREFIX,
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const email = body.email?.trim() ?? ''

  if (!email) {
    return NextResponse.json({ success: false, error: 'email is required' })
  }

  if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_LIST_ID) {
    return NextResponse.json({ success: false, error: 'configuration error' })
  }

  const subscriberHash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex')

  try {
    const existingMember = await mailchimp.lists.getListMember(
      MAILCHIMP_LIST_ID,
      subscriberHash
    )

    if (existingMember.status === 'subscribed') {
      return NextResponse.json({
        success: true,
        message: 'already subscribed',
      })
    }

    await mailchimp.lists.updateListMember(MAILCHIMP_LIST_ID, subscriberHash, {
      status: 'pending',
    })

    return NextResponse.json({
      success: true,
      message: 'pending',
    })
  } catch (error) {
    const mailchimpError = error as {
      response?: { text?: string }
      status?: number
    }

    if (mailchimpError.status === 404) {
      try {
        const response = await mailchimp.lists.addListMember(
          MAILCHIMP_LIST_ID,
          {
            email_address: email,
            status: 'pending',
          }
        )
        if ('status' in response && response.status === 'pending') {
          return NextResponse.json({
            success: true,
            message: 'pending',
          })
        }
      } catch (addError) {
        const message =
          addError instanceof Error ? addError.message : 'Unknown error'
        return NextResponse.json({ success: false, error: message })
      }
    }
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message })
  }
}
