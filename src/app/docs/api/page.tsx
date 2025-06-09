'use client';

import { Layout } from '@/components/layout/Layout';

export default function ApiReferencePage() {
  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">API Reference</h1>
            
            <div className="prose prose-blue max-w-none space-y-12">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-600">
                  The EZPost API allows you to programmatically manage your social media content, schedule posts, and analyze performance. This reference provides detailed information about available endpoints, authentication, and usage examples.
                </p>
              </section>

              {/* Authentication */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Authentication</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    All API requests must include your API key in the Authorization header:
                  </p>
                  <div className="bg-gray-800 rounded-md p-4">
                    <code className="text-sm text-white">
                      Authorization: Bearer your_api_key_here
                    </code>
                  </div>
                  <p className="text-gray-600">
                    You can find your API key in your account settings under the API Access section.
                  </p>
                </div>
              </section>

              {/* Base URL */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Base URL</h2>
                <div className="bg-gray-800 rounded-md p-4">
                  <code className="text-sm text-white">
                    https://api.ezpost.com/v1
                  </code>
                </div>
              </section>

              {/* Endpoints */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Endpoints</h2>
                
                {/* Content Generation */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-4">Content Generation</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">POST</span>
                          <code className="text-sm text-gray-800">/content/generate</code>
                        </div>
                        <p className="mt-2 text-gray-600">Generate AI-powered content for social media posts.</p>
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Request Body</h4>
                            <pre className="mt-2 bg-gray-800 rounded-md p-4">
                              <code className="text-sm text-white">{`{
  "prompt": "string",
  "platforms": ["twitter", "linkedin", "facebook", "instagram"],
  "tone": "professional" | "casual" | "humorous",
  "keywords": ["string"]
}`}</code>
                            </pre>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Response</h4>
                            <pre className="mt-2 bg-gray-800 rounded-md p-4">
                              <code className="text-sm text-white">{`{
  "content": [
    {
      "platform": "string",
      "text": "string",
      "hashtags": ["string"],
      "suggestedTime": "string"
    }
  ]
}`}</code>
                            </pre>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">GET</span>
                          <code className="text-sm text-gray-800">/content</code>
                        </div>
                        <p className="mt-2 text-gray-600">List all generated content.</p>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900">Query Parameters</h4>
                          <ul className="mt-2 list-disc pl-4 space-y-2 text-gray-600">
                            <li>page (optional): Page number for pagination</li>
                            <li>limit (optional): Number of items per page</li>
                            <li>platform (optional): Filter by platform</li>
                            <li>status (optional): Filter by content status</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scheduling */}
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-4">Scheduling</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">POST</span>
                          <code className="text-sm text-gray-800">/schedule</code>
                        </div>
                        <p className="mt-2 text-gray-600">Schedule a social media post.</p>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900">Request Body</h4>
                          <pre className="mt-2 bg-gray-800 rounded-md p-4">
                            <code className="text-sm text-white">{`{
  "contentId": "string",
  "platform": "string",
  "scheduledTime": "ISO-8601 timestamp",
  "timezone": "string"
}`}</code>
                          </pre>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">GET</span>
                          <code className="text-sm text-gray-800">/schedule</code>
                        </div>
                        <p className="mt-2 text-gray-600">List all scheduled posts.</p>
                      </div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-4">Analytics</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">GET</span>
                          <code className="text-sm text-gray-800">/analytics/posts</code>
                        </div>
                        <p className="mt-2 text-gray-600">Get performance metrics for your posts.</p>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900">Query Parameters</h4>
                          <ul className="mt-2 list-disc pl-4 space-y-2 text-gray-600">
                            <li>startDate: Start date for the analysis period</li>
                            <li>endDate: End date for the analysis period</li>
                            <li>platform (optional): Filter by platform</li>
                            <li>metrics (optional): Specific metrics to include</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Rate Limits */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rate Limits</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    API requests are subject to the following rate limits:
                  </p>
                  <ul className="list-disc pl-4 space-y-2 text-gray-600">
                    <li>Content Generation: 60 requests per hour</li>
                    <li>Scheduling: 120 requests per hour</li>
                    <li>Analytics: 300 requests per hour</li>
                  </ul>
                  <p className="text-gray-600">
                    Rate limits are based on your API key. The response headers include your current rate limit status:
                  </p>
                  <pre className="bg-gray-800 rounded-md p-4">
                    <code className="text-sm text-white">{`X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1635724800`}</code>
                  </pre>
                </div>
              </section>

              {/* Error Handling */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error Handling</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    The API uses standard HTTP response codes to indicate success or failure:
                  </p>
                  <ul className="list-disc pl-4 space-y-2 text-gray-600">
                    <li>200: Success</li>
                    <li>400: Bad Request - Invalid parameters</li>
                    <li>401: Unauthorized - Invalid API key</li>
                    <li>403: Forbidden - Insufficient permissions</li>
                    <li>404: Not Found - Resource doesn't exist</li>
                    <li>429: Too Many Requests - Rate limit exceeded</li>
                    <li>500: Internal Server Error</li>
                  </ul>
                  <p className="text-gray-600">
                    Error responses include a message explaining what went wrong:
                  </p>
                  <pre className="bg-gray-800 rounded-md p-4">
                    <code className="text-sm text-white">{`{
  "error": {
    "code": "invalid_request",
    "message": "The request parameters are invalid",
    "details": {
      "field": "platform",
      "issue": "must be one of: twitter, linkedin, facebook, instagram"
    }
  }
}`}</code>
                  </pre>
                </div>
              </section>

              {/* SDKs and Libraries */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">SDKs and Libraries</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    We provide official SDKs for popular programming languages:
                  </p>
                  <ul className="list-disc pl-4 space-y-2 text-gray-600">
                    <li>
                      <a href="#" className="text-blue-600 hover:text-blue-800">JavaScript/TypeScript</a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:text-blue-800">Python</a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:text-blue-800">Ruby</a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:text-blue-800">PHP</a>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Support */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need Help?</h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    If you need help with API integration or have any questions, our developer support team is here to assist you.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      Email us at:{' '}
                      <a href="mailto:api-support@ezpost.com" className="text-blue-600 hover:text-blue-800">
                        api-support@ezpost.com
                      </a>
                    </p>
                    <p className="text-gray-600">
                      Join our{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800">
                        Developer Community
                      </a>
                      {' '}for discussions and updates.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 