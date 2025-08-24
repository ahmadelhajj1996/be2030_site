import First from "../assets/images/First.png";
import google from "../assets/images/google.png";
import apple from "../assets/images/apple.png";


// using tailwind in react page give me the best and full reponsive code for Heading Section that contain Title , description , grid of 2 action buttons , and Big Image For the Site Mobile app reference , please give me the code in best practice way and discuss all the responsive lines ( sm . md , lg , xl , etc... )  

function Test() {
  return (
    <>
      <div dir="rtl" lang="ar">
        <section className="relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-start flex flex-col gap-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#249192] leading-tight">
                  بيع واشتري بكل سهولة تواصل مباشر بدون وسيط
                </h1>

                <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                  تطبيق سوق البلد هو منصّة سهلة وآمنة للإعلانات المبوبة، تربط
                  البائعين بالمشترين مباشرة في جميع أنحاء البلاد
                </p>

                <div className="mt-10 grid grid-cols-2 gap-x-4   lg:w-2/3  mx-auto   items-center">
                  <a href="#" className=" flex justify-center ">
                    <img
                      className=" rounded-2xl h-[40px] lg:h-[50px]  "
                      src={google}
                      alt=""
                    />
                  </a>

                  <a href="#" className=" flex justify-center">
                    <img
                      className=" rounded-2xl h-[40px] lg:h-[50px]"
                      src={apple}
                      alt=""
                    />
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="w-full h-[32rem]  lg:h-[40rem] ">
                  <div className="aspect-w-3 aspect-h-4 w-full h-full">
                    <img
                      src={First}
                      alt="App screenshot"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Test