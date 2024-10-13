import { AnalyticsPageComponent } from '@/components/AnalyticsPageComponent'

export default function AnalyticsPage() {
  // In a real application, you would get the userId from your authentication system
  const userId = 'user1' // This is a placeholder
  return <AnalyticsPageComponent userId={userId} />
}
