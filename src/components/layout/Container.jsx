import PropTypes from "prop-types";
import Breadcrumb from "../navigation/Breadcrumb";

const Container = ({
  children,
  title,
  showHeader = true,
  showBreadcrumb = false,
  breadcrumbText = "",
  breadcrumbSize = 20,
  breadcrumbClassName = "",
  additionalHeaderContent,
  className = ''
}) => {
  return (
    <div className={className} >
      {showHeader && (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-6">
              {showBreadcrumb && (
                <Breadcrumb
                  size={breadcrumbSize}
                  className={breadcrumbClassName}
                  text={breadcrumbText}
                />
              )}
             { 
               title &&  <h1 className="text-lg font-normal">{title}</h1>
              
             }
            </div>
            {additionalHeaderContent && (
              <div className="flex items-center space-x-6">
                {additionalHeaderContent}
              </div>
            )}
          </div>
        </div>
      )}

      <div className= {`bg-white overflow-hidden`} >{children}</div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  showHeader: PropTypes.bool,
  showBreadcrumb: PropTypes.bool,
  breadcrumbText: PropTypes.string,
  breadcrumbSize: PropTypes.number,
  breadcrumbClassName: PropTypes.string,
  additionalHeaderContent: PropTypes.node,
  className : PropTypes.string,
};

export default Container;

{
  /* <Container title="My Page" showBreadcrumb={true}>
  welcome
</Container>;
  and there is another call in the table component 
*/
}
