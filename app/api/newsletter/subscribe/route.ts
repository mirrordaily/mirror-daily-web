import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'
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

  try {
    const response = await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
    })

    if ('id' in response) {
      return NextResponse.json({
        success: true,
        message: 'subscription successful',
      })
    }
  } catch (error) {
    const mailchimpError = error as {
      response?: { text?: string }
    }
    const errorText = mailchimpError?.response?.text

    if (errorText) {
      const errorBody = JSON.parse(errorText)
      if (errorBody?.title === 'Member Exists') {
        return NextResponse.json({
          success: true,
          message: 'already subscribed',
        })
      }
    }
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message })
  }
}
