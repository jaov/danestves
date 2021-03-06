import React, { useState } from "react"
import { useTransition, animated, config } from "react-spring"
import { TransitionLink as Link } from "gatsby-plugin-transition-link/components/TransitionLink"
import useDarkMode from "use-dark-mode"

import { Navbar, Logo } from "./"

export default () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const openTransition = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { ...config.wobbly, clamp: true },
  })
  const drawerTransition = useTransition(isOpen, null, {
    from: { right: `-${100}%` },
    enter: { right: `${0}` },
    leave: { right: `-${100}%` },
    config: { mass: 1, tension: 200, friction: 30, clamp: true },
  })
  const dropdownTransition = useTransition(isOpenDropdown, null, {
    from: {
      opacity: 0,
      transform: `scale(${0.9})`,
      transformOrigin: "top right",
    },
    enter: { opacity: 1, transform: `scale(${1})` },
    leave: { opacity: 0, transform: `scale(${0.9})` },
    config: config.wobbly,
  })
  const darkMode = useDarkMode(false)

  return (
    <header className="bg-white shadow dark:bg-indigo-900 dark:shadow-white-md">
      <div className="md:px-8">
        <Navbar>
          <div className="relative flex-1 flex-shrink-0 py-4 pl-4 md:p-0">
            <Link to="/" title="Inicio">
              <Logo />
            </Link>
          </div>

          <div className="flex-shrink-0 pr-4 md:hidden">
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setIsOpen(!isOpen)}
              className="block text-gray-600 focus:outline-none focus:text-gray-900 dark:text-white"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6Z" />
                <path d="M3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12Z" />
                <path d="M4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17H4Z" />
              </svg>
            </button>
          </div>

          <div className="hidden md:block md:ml-10 md:flex md:items-baseline md:bg-transparent">
            <div className="flex items-center justify-center">
              <Link
                to="/"
                title="Inicio"
                className="ml-10 text-sm font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 transition-all transition-250"
              >
                Inicio
              </Link>
              <button
                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                className="relative ml-10 text-sm font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 transition-all transition-250"
              >
                Sobre
                {dropdownTransition.map(
                  ({ item, key, props }) =>
                    item && (
                      <animated.div
                        key={key}
                        style={props}
                        className="absolute right-0 z-10 mt-6 rounded shadow origin-top-right dark:shadow-white"
                      >
                        <div className="w-40 text-left bg-white rounded-lg shadow-lg dark:bg-gray-800">
                          <div className="py-1">
                            <Link
                              to="/curriculum"
                              title="Curriculum"
                              className="block px-6 py-3 leading-tight text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 transition-all transition-250"
                            >
                              Curriculum
                            </Link>
                            <Link
                              to="/certificaciones"
                              title="Certificaciones"
                              className="block px-6 py-3 leading-tight text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 transition-all transition-250"
                            >
                              Certificaciones
                            </Link>
                          </div>
                        </div>
                      </animated.div>
                    )
                )}
              </button>
              <Link
                to="/portafolio"
                title="Portafolio"
                className="ml-10 text-sm font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 transition-all transition-250"
              >
                Portafolio
              </Link>
              <Link
                to="/blog"
                title="Blog"
                className="ml-10 text-sm font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 transition-all transition-250"
              >
                Blog
              </Link>
              <Link
                to="/contacto"
                title="Contacto"
                className="ml-10 text-sm font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 transition-all transition-250"
              >
                Contacto
              </Link>
            </div>
          </div>

          <div className="flex items-center px-3 ml-4 toggleWrapper">
            <input
              type="checkbox"
              className="absolute dn"
              id="dn"
              checked={darkMode.value}
              onChange={darkMode.toggle}
            />
            <label htmlFor="dn" className="toggle">
              <span className="toggle__handler">
                <span className="crater crater--1" />
                <span className="crater crater--2" />
                <span className="crater crater--3" />
              </span>
              <span className="star star--1" />
              <span className="star star--2" />
              <span className="star star--3" />
              <span className="star star--4" />
              <span className="star star--5" />
              <span className="star star--6" />
            </label>
          </div>
        </Navbar>
      </div>

      {isOpenDropdown ? (
        <div
          onClick={() => setIsOpenDropdown(false)}
          onKeyDown={() => setIsOpenDropdown(false)}
          className="fixed inset-0"
          tabIndex="-1"
          role="button"
        />
      ) : (
        ""
      )}

      <div className="md:hidden">
        {openTransition.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={props}
                className="fixed inset-0 z-10"
              >
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  onKeyDown={() => setIsOpen(!isOpen)}
                  className="absolute inset-0 bg-black opacity-50"
                  tabIndex="-1"
                  role="button"
                />
              </animated.div>
            )
        )}

        {drawerTransition.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={props}
                className="fixed inset-y-0 z-10 w-full max-w-xs overflow-y-auto bg-white dark:bg-indigo-900 transition-transform"
              >
                <div className="relative z-10 bg-white dark:bg-indigo-900">
                  <div
                    className={`${
                      isOpen ? "block" : "hidden"
                    } absolute top-0 p-4`}
                  >
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      type="button"
                      className="text-gray-600 focus:outline-none focus:text-gray-900"
                      aria-label="Close"
                    >
                      <svg
                        className="w-6 h-6 text-indigo-700 dark:text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L13.4142 12L19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L12 10.5858L5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L10.5858 12L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L12 13.4142L18.2929 19.7071Z" />
                      </svg>
                    </button>
                  </div>
                  <div className="px-4 pt-8 pb-6">
                    <Link
                      to="/"
                      title="Inicio"
                      className="block mt-8 font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 transition-all transition-250"
                    >
                      Inicio
                    </Link>
                    <Link
                      to="/curriculum"
                      title="Curriculum"
                      className="block mt-8 font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 transition-all transition-250"
                    >
                      Curriculum
                    </Link>
                    <Link
                      to="/certificaciones"
                      title="Certificaciones"
                      className="block mt-8 font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 transition-all transition-250"
                    >
                      Certificaciones
                    </Link>
                    <Link
                      to="/portafolio"
                      title="Portafolio"
                      className="block mt-8 font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 transition-all transition-250"
                    >
                      Portafolio
                    </Link>
                    <Link
                      to="/blog"
                      title="Blog"
                      className="block mt-8 font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 transition-all transition-250"
                    >
                      Blog
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <div className="p-4">
                    <Link
                      to="/contacto"
                      title="Contacto"
                      className="block px-3 py-3 font-medium text-center text-gray-900 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                    >
                      Contactame
                    </Link>
                  </div>
                </div>
              </animated.div>
            )
        )}
      </div>
    </header>
  )
}
