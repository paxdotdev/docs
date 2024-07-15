# Coordinate System & Transforms

Pax's coordinate system is "top-left origin; right is positive x; down is positive y"

<!-- TODO: image illustrating coordinate system -->

### Affine transforms (Transform2D)

The way elements get positioned, sized, and moved around in Pax is through the powerful `transform` property.  This property is nearly ubiquitous across the landscape of GUI and graphical development tools (such as `matrix3d()` in CSS), but it tends to be more front-and-center in game engines than it is in UI layout systems.

Perhaps the easiest way to think about Pax's transform model is "design tool coordinates."  That is, when you select an element in a vector design tool like Figma, Sketch, or Illustrator, you can: _drag_ it (`translate`), _resize_ it (`scale`), _rotate_ it, and _skew_ it (with a combination of rotation and scale.)  Each of these operations can be expressed in Pax, as well.

```pax
<Group id=a transform=rotate(150deg)>
    <Rectangle id=b transform=translate(50px, 50px) />
    <Rectangle id=c transform=scale(150%, 150%) />
</Group>
```

In the above example, rectangle `b` will be moved 50px to the right and 50px down.  The rectangle `c` will be 150% the width & height of its default values.  And the group `a` will be rotated 150 degrees — which, in fact, ends up rotating both of the rectangles as well.  Read more about this below in [combining transformations.](#combining-transformations)


### Common Properties

In most cases when you don't need to sequence a bunch of transforms in a specific way, you can set the property directly on the template node. 

There are a set of 13 properties on every template node. 

1. **`id`**: A unique identifier for an element, used to reference it within scripts or CSS-like stylesheets.

2. **`x`**: The x-coordinate of the element's anchor point in pixels or percentage relative to its container. Determines the horizontal position.

3. **`y`**: Similar to `x`, this sets the y-coordinate of the element's anchor point, determining the vertical position.

4. **`scale_x`**: Controls the width scaling factor of the element. A value of 1 means no scaling, less than 1 means a reduction, and greater than 1 means an enlargement.

5. **`scale_y`**: Controls the height scaling factor of the element. Works similarly to `scale_x`, affecting vertical dimensions.

6. **`skew_x`**: Applies a horizontal skew transformation to the element, distorting it along the x-axis. The skew angle is specified in degrees.

7. **`skew_y`**: Applies a vertical skew transformation to the element, distorting it along the y-axis. Like `skew_x`, the angle is specified in degrees.

8. **`anchor_x`**: Sets the horizontal part of the element's anchor point, which affects transformations like rotation and scaling. It can be defined in pixels or as a percentage of the element’s width.

9. **`anchor_y`**: Sets the vertical part of the element's anchor point. Similar to `anchor_x`, but for the vertical dimension.

10. **`rotate`**: Specifies the rotation of the element around its anchor point, in degrees. Positive values rotate clockwise, while negative values rotate counterclockwise.

11. **`transform`**: A powerful property that allows for a combination of transformations—translate, scale, rotate, and skew—applied in a specific order to the element.

12. **`width`**: Sets the width of the element, either in pixels or as a percentage of the container's width, allowing for responsive design.


### Anchor & Align
Pax's coordinate system has a notion of `anchor` — letting you set the anchored origin point for transformations.  For example, using `anchor` you can cause a rectangle to be rotated around its top-left corner, vs. rotated around its center-point.  

<!-- TODO: insert image of an Anchor UI, e.g. from Flash/AI/Figma -- or animated example -->

Pax's layout system also allows positions (`x` and `y`) to be expressed as pixel values, as percentage values of their container for responsive alignment, or as a combination of multiple pixel / percent values (via PAXEL expressions.)

For example, `<SomeElement x=50% y=50% />` will position an element's anchor at the center of its container.  `<SomeElement x=5px y={50% + 5px}>` shows both a literal pixel value for x and a combination of multiple units using PAXEL (50% of container's width, plus an additional 5px).

<!-- TODO: insert image illustrating alignment relative to parent container -->

The combination of `anchor` and `align` offers powerful, fine-grained positioning, well suited to responsive design for varying screen sizes.



### Combining transformations

What happens when you want to both resize AND rotate an element?  You must _combine transformations_.  Depending on your needs, there are two broad ways to combine transformations:

#### 1. Hierarchical composition

When you transform an element that can contain other elements -- such as a `<Group>...</Group>`, all of its children elements will _inherit_ that transformation as a starting point.  For example:

```
<Group id=groo >
    <Rectangle id=ree />
</Group>
```

If a `transform` is applied to the group `groo`, such as a translation by 50px to the right, all descendants (in this case, the rectangle `ree`) will also be automatically translated by 50px to the right.  This translation occurs _after_ all of `ree`'s transform logic is calculated, and is handled by Pax's core layout engine.

This notion of hierarchical transformation may by familiar if you have used the `group` functionality of a vector design tool — specifically the behavior of individual grouped elements when you drag, rotate, or resize the whole group.  As an exercise, try making a nest multiple layers deep of groups in a vector design tool, and observe what happens to individual elements and groups when you transform the entire container.

#### 2. Matrix multiplication

Often times, you will want to combine transformations on a single element, without using any sort of nesting.  In these cases, you will want to _multiply transforms._  This entails two steps:

  1. use an expression (`{...}`) for the transform value, and
  2. multiply different affine operations within that expression

The reason multiplication is the combinational operator for transformations stems from linear algebra, where _matrix multiplication_ describes the sequential combination of _affine transformation matrices._

An example of combining multiple transformations with matrix multiplication:

```pax
<Rectangle width=100px height=200px transform={
    rotate(100deg) *
    translate(100px, 100px) *
    scale(200%, 200%)
} />
```

In the above, the 100px square will be rotated, then translated (moved), then scaled (resized).

A few important notes about matrix multiplication:

 1. Order matters — for example `translate() * rotate()` will generally yield different behavior vs. `rotate() * translate()`.
 2. You can combine the same operation multiple times — for example `scale() * scale()` or `rotate() * scale() * rotate()`
 3. Since these multiplications happen in an `expression` context, you may also use symbolic `properties` in these expressions — for example `rotate(self.base_rotation * self.rotation_multiplier)` or `scale(self.scale_mult) * rotate(self.active_rotation)`


Organizationally, you may find that it is useful to combine hierarchical grouping with matrix multiplication in different ways.  You may also make use of helper methods which can return dynamic or pre-computed transformations.  Finally, the use of layout components (such as `pax-std`'s `Stacker`, or components that you may author yourself) allow abstraction of complex positioning and resizing logic.

--

[1] Affine transforms:  https://en.wikipedia.org/wiki/Affine_transformation

