import { useEffect, useState } from "react"
import TaskPage from "../../pages/TaskPage"
import { BASE_URL } from "../../shared/constants"

const getCurrentPath = () => {
  const getCurrentPath = () => {
  const pathname = window.location.pathname;
  
  // Если мы на GitHub Pages, отрезаем имя репозитория
  // Например, из "/to-do-react/tasks/1" делаем "/tasks/1"
  if (pathname.startsWith('/to-do-react')) {
    const path = pathname.replace('/to-do-react', '');
    return path === '' ? '/' : path;
  }
  
  // Если это локальный сервер, возвращаем как есть
  return pathname;
}
}

const mathPath = (path, route) => {
  const pathParts = path.split('/')
  const routePaths = route.split('/')

  if (pathParts.length !== routePaths.length) {
    return null
  }

  const params = {}

  for (let i = 0; i < routePaths.length; i++) {
    if (routePaths[i].startsWith(':')) {
      const paramName = routePaths[i].slice(1)

      params[paramName] = pathParts[i]
    } else if (routePaths[i] !== pathParts[i]) {
      return null
    }
  }

  return params
}

export const useRoute = () => {
  const [path, setPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setPath(getCurrentPath)
    }

    window.addEventListener('popstate', onLocationChange)

    return () => {
      window.removeEventListener('popstate', onLocationChange)
    }
  }, [])

  return path
}

const Router = (props) => {
  const { routes } = props
  const path = useRoute()

  for (const route in routes) {
    const params = mathPath(path, route)

    if (params) {
      const Page = routes[route]

      return <Page params={params} />
    }
  }

  const NotFound = routes['*']

  return <NotFound />
}

export default Router