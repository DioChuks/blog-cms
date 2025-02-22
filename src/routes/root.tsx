import { FC } from 'react'

const Root: FC = () => {
  return (
<div className="flex flex-col h-screen bg-gray-100">
    {/* <!-- Auth Card Container --> */}
    <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="flex">
            <span className="text-center font-bold my-20 mx-auto">        
                <a href="https://egoistdeveloper.github.io/twcss-to-sass-playground/" target="_blank" className="text-cyan-600">
                    Blog Admin
                </a>
            </span>
        </div>
    
    
        {/* <!-- Auth Card --> */}
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">

            {/* <!-- Card Title --> */}
            <h2 className="text-center font-semibold text-3xl lg:text-4xl text-[#2F3F67]">
                Login
            </h2>

            <form className="mt-10" method="POST">
                {/* <!-- Email Input --> */}
                <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                <input id="email" type="email" name="email" placeholder="e-mail address" autoComplete="email"
                    className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    required />

                {/* <!-- AccessKey Input --> */}
                <label htmlFor="accessKey" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Key</label>
                <input id="accessKey" type="password" name="access_key" placeholder="access key 🗝️" autoComplete="current-key"
                    className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    required />

                {/* <!-- Auth Buttton --> */}
                <button type="submit"
                    className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none">
                    Login
                </button>

                {/* <!-- Another Auth Routes --> */}
                <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                    <a href="mailto:silfricatech@gmail.com" className="flex-2 underline">
                        Can't find key?
                    </a>

                    <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                        or
                    </p>
        
                    <a href="/dashboard" className="flex-2 underline">
                        Go to dashboard
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default Root