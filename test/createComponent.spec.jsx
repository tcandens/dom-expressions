import * as S from "s-js";

describe("create component with dynamic expressions", () => {
  it("should properly create dynamic properties", () => {
    let span, disposer;
    const favoriteCar = S.data("Porsche 911 Turbo");

    const DynamicChild = props => (
      <span forwardRef={props.ref}>
        {props.name} loves {props.favoriteCar}
      </span>
    );

    const Component = () => (
      <DynamicChild ref={span} name="John" favoriteCar={favoriteCar()} />
    );

    S.root(dispose => {
      disposer = dispose;
      <Component />;
    });

    expect(span.textContent).toBe("John loves Porsche 911 Turbo");
    favoriteCar("Nissan R35 GTR");
    expect(span.textContent).toBe("John loves Nissan R35 GTR");
    disposer();
  });
});

describe("create component with class syntax", () => {
  class Component {}
  Component.prototype.isClassComponent = true;

  it("should properly create component", () => {
    let ref, disposer;

    class MyComponent extends Component {
      constructor() {
        super();
        this.favoriteCar = S.data("Porsche 911 Turbo");
      }
      render() {
        return <div ref={ref}>John loves {this.favoriteCar()}</div>;
      }
    }

    S.root(dispose => {
      disposer = dispose;
      <MyComponent />;
    });

    expect(ref.textContent).toBe("John loves Porsche 911 Turbo");
    disposer();
  });
});
